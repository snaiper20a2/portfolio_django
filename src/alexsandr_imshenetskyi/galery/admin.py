from django.contrib import admin

from .models import Projects, Photos, Bio, ProjectTypes, Request

admin.site.register(Projects)
admin.site.register(Photos)
admin.site.register(Bio)
admin.site.register(ProjectTypes)
admin.site.register(Request)
