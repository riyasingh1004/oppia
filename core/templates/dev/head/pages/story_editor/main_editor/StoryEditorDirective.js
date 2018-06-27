// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controller for the main story editor.
 */
oppia.directive('storyEditor', [
  'UrlInterpolationService', function(UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
        '/pages/story_editor/main_editor/story_editor_directive.html'),
      controller: [
        '$scope', 'StoryEditorStateService', 'StoryUpdateService',
        'UndoRedoService', 'EVENT_STORY_INITIALIZED',
        'EVENT_STORY_REINITIALIZED',
        function(
            $scope, StoryEditorStateService, StoryUpdateService,
            UndoRedoService, EVENT_STORY_INITIALIZED,
            EVENT_STORY_REINITIALIZED) {
          var _initEditor = function() {
            $scope.story = StoryEditorStateService.getStory();
            $scope.storyTitleEditorIsShown = false;
            $scope.editableTitle = $scope.story.getTitle();
            $scope.notes = $scope.story.getNotes();
            $scope.notesEditorIsShown = false;
            $scope.editableDescription = $scope.story.getDescription();
            $scope.editableDescriptionIsEmpty = (
              $scope.editableDescription === '');
            $scope.storyDescriptionChanged = false;
          };

          $scope.NOTES_SCHEMA = {
            type: 'html',
            ui_config: {
              rows: 100
            }
          };
          $scope.openPreviewNotes = function(notes) {
            $scope.notesEditorIsShown = false;
            $scope.notes = notes;
          };

          $scope.closePreviewNotes = function(previewNotes) {
            $scope.notesEditorIsShown = true;
            $scope.editableNotes = previewNotes;
          };

          $scope.updateNotes = function(newNotes) {
            if (newNotes === $scope.story.getNotes()) {
              return;
            }
            StoryUpdateService.setStoryNotes($scope.story, newNotes);
            $scope.openPreviewNotes(newNotes);
          };

          $scope.updateStoryDescriptionStatus = function(description) {
            $scope.editableDescriptionIsEmpty = (description === '');
            $scope.storyDescriptionChanged = true;
          };

          $scope.openStoryTitleEditor = function() {
            $scope.storyTitleEditorIsShown = true;
            $scope.editableTitle = $scope.story.getTitle();
          };

          $scope.closeStoryTitleEditor = function() {
            $scope.storyTitleEditorIsShown = false;
            $scope.editableTitle = $scope.story.getTitle();
          };

          $scope.updateStoryTitle = function(newTitle) {
            StoryUpdateService.setStoryTitle($scope.story, newTitle);
            $scope.closeStoryTitleEditor();
          };

          $scope.updateStoryDescription = function(newDescription) {
            if (newDescription !== $scope.story.getDescription()) {
              StoryUpdateService.setStoryDescription(
                $scope.story, newDescription);
            }
          };

          $scope.$on(EVENT_STORY_INITIALIZED, _initEditor);
          $scope.$on(EVENT_STORY_REINITIALIZED, _initEditor);

          _initEditor();
        }
      ]
    };
  }]);
