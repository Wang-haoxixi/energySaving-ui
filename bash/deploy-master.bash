#!/bin/bash

current_branch_name=`git rev-parse --abbrev-ref HEAD` && \
git checkout develop && \
git merge $current_branch_name && git push && \
git checkout deploy-master && \
git reset --hard develop && git push