#!/bin/bash

echo 'Creating DB...'

psql -U postgres postgres -c "CREATE DATABASE PEOPLE_MANAGER"
