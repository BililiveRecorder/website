"""
Copyright 2019-2022 DataRobot, Inc. and its affiliates.
All rights reserved.
"""
import os

from setuptools import find_packages, setup


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

test_requirements = [
    'pytest',
    'pytest <5; python_version < "3.0"',
]

release_requirements = [
    'twine>=1.13.0',
    'twine>=1.13.0,<2; python_version < "3.0"',
]


setup(
    name='mkdocs-brec-redirects',
    version='1.0.4',
    description='A MkDocs plugin for dynamic page redirects to prevent broken links.',
    long_description=read('README.md'),
    long_description_content_type="text/markdown",
    keywords='mkdocs redirect',
    url='https://github.com/datarobot/mkdocs-redirects',
    author='Dustin Burke',
    author_email='dustin@datarobot.com',
    license='MIT',
    python_requires='>=2.7',
    install_requires=[
        'mkdocs>=1.0.4,<2',
    ],
    extras_require={
        'dev': test_requirements + release_requirements,
        'test': test_requirements,
        'release': release_requirements,
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Intended Audience :: Information Technology',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
    ],
    packages=find_packages(),
    entry_points={
        'mkdocs.plugins': [
            'brec-redirects = brec_redirects.plugin:RedirectPlugin'
        ]
    }
)
