# Generated by Django 4.2.2 on 2023-07-14 13:13

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Story', '0004_storyviewd'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StoryViewd',
            new_name='StoryViewed',
        ),
    ]
