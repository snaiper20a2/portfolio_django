from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView

from .forms import RequestForm
from .models import *


def index(request):
    context = {'bio': get_bio(), 'projects': get_projects(), 'sections': get_sections()}
    return render(request, 'galery/index.html', context=context)


def section(request, section_slug):
    context = {'bio': get_bio(), 'projects': get_projects(project_type=section_slug), 'sections': get_sections(),
               'current_section': ProjectTypes.objects.get(slug=section_slug)}
    return render(request, 'galery/section.html', context=context)


# def contact(request):
#     context = {'bio': get_bio(), 'projects': get_projects(), 'sections': get_sections()}
#     return render(request, 'galery/contact.html', context=context)


class Contact(CreateView):
    template_name = 'galery/contact.html'
    form_class = RequestForm
    success_url = reverse_lazy('contact')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['bio'] = get_bio()
        context['projects'] = get_projects()
        context['sections'] = get_sections()
        return context


def get_bio():
    bio = Bio.objects.get(id=1)
    print(bio.telegram_url)
    return bio


def get_projects(project_type='all'):
    if project_type == 'all':
        projects_list_from_db = Projects.objects.all()
    else:
        project_type = ProjectTypes.objects.get(slug=project_type)
        projects_list_from_db = Projects.objects.filter(type=project_type)
    projects_obj = []
    for project in projects_list_from_db:
        photos = []
        photos_list_from_db = Photos.objects.filter(project=project)
        for photo in photos_list_from_db:
            photos.append({'photo': photo.photo.url, 'thumbnail': photo.thumbnail.url})
        obj = {'project': project, 'photos': photos}
        projects_obj.append(obj)
    return projects_obj


def get_sections():
    return ProjectTypes.objects.all()
# def get_page_list(length, cur_page):
#     page_list = {}
#     if length == 1:
#         return None
#
#
