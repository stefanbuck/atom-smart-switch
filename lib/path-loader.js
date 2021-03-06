(function() {
  var Task;

  Task = require('atom').Task;

  module.exports = {
    startTask: function(callback) {
      var ignoreVcsIgnores, ignoredNames, projectPaths, task, taskPath, traverseIntoSymlinkDirectories, _ref, _ref1, _ref2, _ref3;
      projectPaths = [];
      taskPath = require.resolve('./load-paths-handler');
      traverseIntoSymlinkDirectories = atom.config.get('fuzzy-finder.traverseIntoSymlinkDirectories');
      ignoredNames = (_ref = atom.config.get('fuzzy-finder.ignoredNames')) != null ? _ref : [];
      ignoredNames = ignoredNames.concat((_ref1 = atom.config.get('core.ignoredNames')) != null ? _ref1 : []);
      ignoreVcsIgnores = atom.config.get('core.excludeVcsIgnoredPaths') && ((_ref2 = atom.project) != null ? (_ref3 = _ref2.getRepositories()[0]) != null ? _ref3.isProjectAtRoot() : void 0 : void 0);
      task = Task.once(taskPath, atom.project.getPaths()[0], traverseIntoSymlinkDirectories, ignoreVcsIgnores, ignoredNames, function() {
        return callback(projectPaths);
      });
      task.on('load-paths:paths-found', function(paths) {
        return projectPaths.push.apply(projectPaths, paths);
      });
      return task;
    }
  };

}).call(this);
