# Generated by Django 4.2.2 on 2023-07-11 08:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Story', '0001_initial'),
        ('Post', '0007_alter_comment_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='media',
            name='story',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Story.story'),
        ),
    ]
