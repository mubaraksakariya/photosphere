# Generated by Django 4.2.2 on 2023-08-19 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0013_customuser_is_online'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_private',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='follow',
            name='is_accepted',
            field=models.BooleanField(default=False),
        ),
    ]
