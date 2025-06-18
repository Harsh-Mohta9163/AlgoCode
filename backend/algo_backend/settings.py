from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-6_c7ik#9c%9f5eyp+lyr6cpnkfls++n+8#$d5&w+tb#qqm)23('

DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.sites',  # Required for allauth
    'django.contrib.staticfiles', 
    # REST framework & Token Auth
    'rest_framework',
    'rest_framework.authtoken',

    # dj-rest-auth
    'dj_rest_auth',
    'dj_rest_auth.registration',

    # allauth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',

    # CORS
    'corsheaders',
    'submissions',
]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Keep above CommonMiddleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware'
]

ROOT_URLCONF = 'algo_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',  # Required for allauth
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'algo_backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
]

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
}

# Update these settings
ACCOUNT_LOGIN_METHODS = {'username'}

ACCOUNT_SIGNUP_FIELDS = [
    'email',
    'username', 
    'password1',
    'password2'
]

# If you want email to be required
ACCOUNT_SIGNUP_FIELDS_REQUIRED = {
    'username': True,
    'email': True,
    
}

# ACCOUNT_EMAIL_VERIFICATION = 'optional'  # use 'mandatory' in production
# LOGIN_REDIRECT_URL = "http://localhost:3000/"
# LOGOUT_REDIRECT_URL = "http://localhost:3000/login"
# SOCIALACCOUNT_LOGIN_REDIRECT_URL = "http://localhost:3000/"
# Email verification
ACCOUNT_EMAIL_VERIFICATION = "optional"  # set to 'mandatory' in production

# Redirects
LOGIN_REDIRECT_URL = "http://localhost:3000/"
LOGOUT_REDIRECT_URL = "http://localhost:3000/login"
SOCIALACCOUNT_LOGIN_REDIRECT_URL = "http://localhost:3000/"



# Authentication backends for allauth
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
REST_AUTH = {
    'SESSION_LOGIN': False,
    'USE_JWT': False,
    'JWT_AUTH_COOKIE': None,
    'JWT_AUTH_REFRESH_COOKIE': None,
    'JWT_AUTH_REFRESH_COOKIE_PATH': '/',
    'JWT_AUTH_SECURE': False,
}

# Social account provider configuration
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': os.environ.get("GOOGLE_CLIENT_ID"),
            'secret': os.environ.get("GOOGLE_CLIENT_SECRET"),
            'key': ''
        },
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# ACCOUNT_UNIQUE_EMAIL = True

CORS_ALLOW_CREDENTIALS = True 
REST_USE_JWT = False 


# Add these settings
JUDGE_SETTINGS = {
    'DOCKER_IMAGE': 'judge-python',
    'MEMORY_LIMIT': '512m',
    'CPU_TIMEOUT': 2,  # seconds
}
# Add these settings