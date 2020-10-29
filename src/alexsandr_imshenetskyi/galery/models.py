import os
from io import BytesIO

from PIL import Image
from django.core.files.base import ContentFile
from django.core.mail import send_mail
from django.db import models
from googletrans import Translator


# Create your models here.
def get_slug(name):
    translator = Translator()
    name = str(translator.translate(name, src='ru', dest='en').text).lower()
    slug = ''
    for symbol in name:
        if symbol.isspace():
            symbol = '_'
        slug += symbol
    return slug


class ProjectTypes(models.Model):
    name = models.CharField(
        max_length=50,
        null=False,
        verbose_name='Название раздела'
    )
    slug = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Поле заполняется автоматически'
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = get_slug(self.name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Раздел'
        verbose_name_plural = 'Разделы'


class Projects(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
        null=False,
        verbose_name='Название проекта'
    )
    title = models.TextField(
        null=True,
        blank=True,
        verbose_name='Описание проекта'
    )
    type = models.ForeignKey(
        to=ProjectTypes,
        on_delete=models.SET_NULL,
        verbose_name='Раздел', null=True
    )

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'

    def __str__(self):
        return self.name


class Photos(models.Model):
    project = models.ForeignKey(
        to=Projects,
        on_delete=models.CASCADE,
        verbose_name='Проект',
        null=False
    )
    photo = models.ImageField(
        upload_to='uploads/',
        verbose_name='Изображение'
    )
    thumbnail = models.ImageField(
        upload_to='thumbs',
        editable=False
    )

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return self.project.name + ' ' + self.photo.name

    def save(self, *args, **kwargs):
        if not self.make_thumbnail():
            raise Exception('Could not create thumbnail - is the file type valid?')
        super(Photos, self).save(*args, **kwargs)

    def make_thumbnail(self):
        image = Image.open(self.photo)
        thumbnail_size = (475, 270)
        width_original = image.width
        height_original = image.height

        w = width_original / thumbnail_size[0]
        h = height_original / thumbnail_size[1]

        if w > h:
            width = thumbnail_size[0] * h
            x1 = (width_original - width) / 2
            y1 = 0
            x2 = x1 + width
            y2 = height_original
            image = image.crop(box=(x1, y1, x2, y2))
        elif h > w:
            height = thumbnail_size[1] * w
            x1 = 0
            y1 = (height_original - height) / 2
            x2 = width_original
            y2 = y1 + height
            image = image.crop(box=(x1, y1, x2, y2))
            pass

        image.thumbnail(thumbnail_size, Image.BICUBIC)

        thumb_name, thumb_extension = os.path.splitext(self.photo.name)
        thumb_extension = thumb_extension.lower()

        thumb_filename = thumb_name + '_thumb' + thumb_extension

        if thumb_extension in ['.jpg', '.jpeg']:
            FTYPE = 'JPEG'
        elif thumb_extension == '.gif':
            FTYPE = 'GIF'
        elif thumb_extension == '.png':
            FTYPE = 'PNG'
        else:
            return False  # Unrecognized file type

        temp_thumb = BytesIO()
        image.save(temp_thumb, FTYPE)
        temp_thumb.seek(0)

        self.thumbnail.save(thumb_filename, ContentFile(temp_thumb.read()), save=False)

        temp_thumb.close()

        return True

    # def save(self, *args, **kwargs):
    #     super(Photos, self).save(*args, **kwargs)
    #     self.thumbnail = get_thumbnail(self.photo, '475x270', crop='center', quality=99, format='JPEG').url
    #     self.medium = get_thumbnail(self.photo, '1500', crop='center', quality=99, format='JPEG').url
    #     super(Photos, self).save(*args, **kwargs)


class Bio(models.Model):
    title = models.CharField(
        max_length=50,
        null=False,
        verbose_name='Заголовок'
    )
    text = models.TextField(
        null=False,
        verbose_name='Описание'
    )
    photo = models.ImageField(
        upload_to='face/',
        verbose_name='Аватар'
    )
    facebook_url = models.URLField(
        verbose_name='Ccылка на профиль Фейсбук',
        blank=True
    )
    telegram_url = models.URLField(
        verbose_name='Ccылка на Телеграм',
        blank=True
    )

    class Meta:
        verbose_name = 'Блок биографии'
        verbose_name_plural = 'Блок биографии'


class Request(models.Model):
    name = models.CharField(max_length=50, verbose_name='Имя')
    email = models.EmailField(max_length=254, verbose_name='Email')
    phone = models.CharField(max_length=13, blank=True, verbose_name='Номер телефона')
    message = models.TextField(verbose_name='Сообщение')

    def save(self, *args, **kwargs):
        super().save(self, args, kwargs)
        send_mail(
            'Заявка с сайта',
            ' Номер телефона: ' + self.phone + ' Email: ' + self.email + ' Сообщение: ' + self.message,
            self.email,
            ['snaiper20a2@gmail.com'],
            fail_silently=True,
        )
