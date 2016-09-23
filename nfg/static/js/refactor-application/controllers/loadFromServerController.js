/**
 * Created by giacomo on 16/05/16.
 */
(function () {
    'use strict';
    /**
     * Controller for the modal used to load a graph from the server
     * @param $uibModalInstance Instance of the modal used to load the controller.
     * @param BackendCallService Service used to make call to the backend
     */
    var loadFromServerController = function ($uibModalInstance, BackendCallService) {
        var ctrl = this;
        // the selected Graph
        ctrl.selectedGraph = null;
        // control variable used to show the forwarding graph preview
        ctrl.showGraph = false;

        /**
         * Get all available graph
         */
        BackendCallService.getAvailableGraphs().then(function (result) {
            ctrl.availableGraphs = result["NF-FG"];
            if (ctrl.availableGraphs.length > 0)
                ctrl.selectedGraph = ctrl.availableGraphs[0];
        });

        /**
         * function used to close the graph, without doing anything
         */
        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        /**
         * function used to close the graph when a graph is choose
         */
        ctrl.load = function () {
            if (ctrl.selectedGraph)
                $uibModalInstance.close(ctrl.selectedGraph);
        };
        /**
         * Function to enable the preview mode
         */
        ctrl.preview = function () {
            ctrl.showGraph = true;
        };
    };

    loadFromServerController.$inject = ['$uibModalInstance', 'BackendCallService'];
    angular.module('fg-gui').controller('LoadFromServerController', loadFromServerController);

})();
