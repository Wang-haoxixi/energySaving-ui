#!/bin/bash

current_branch_name=`git rev-parse --abbrev-ref HEAD` && \
git fetch -p && \
git merge origin/$current_branch_name && \
git checkout test && \
git merge $current_branch_name && git push && \
git checkout deploy-release && \
git reset --hard test && git push
