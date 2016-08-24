/**
 * Created by giacomo on 03/07/16.
 */
(function () {
    'use strict';
    var fgModalService = function ($q, $uibModal) {

        /**
         *
         * @param fg
         * @param fgPos
         * @param schema
         * @returns {Window|*}
         * @private
         */
        var _newEndpointModal = function (fg, fgPos, schema) {
            return $uibModal.open({
                animation: false,
                templateUrl: '/static/js/fg-d3/modal_view/endpointModalView.html',
                controller: 'NewEndpointModalController',
                controllerAs: 'EPCtrl',
                size: 'lg',
                resolve: {
                    // the info passed to the controller of the modal
                    fg: function () {
                        return clone(fg)
                    },
                    fgPos: function () {
                        return clone(fgPos)
                    },
                    schema: function () {
                        return clone(schema)
                    }
                }
            });
        };

        /**
         *
         * @param elem
         * @param pos
         * @param schema
         * @returns {Window|*}
         * @private
         */
        var _editEndpointModal = function (elem, pos, schema) {
            return $uibModal.open({
                animation: false,
                templateUrl: '/static/js/fg-d3/modal_view/endpointModalView.html',
                controller: 'EditEndpointModalController',
                controllerAs: 'EPCtrl',
                size: 'lg',
                resolve: {
                    // the info passed to the controller of the modal
                    elem: function () {
                        return clone(elem)
                    },
                    pos: function () {
                        return clone(pos)
                    },
                    schema: function () {
                        return clone(schema)
                    }
                }
            });
        };

        /**
         *
         * @param fg
         * @param fgPos
         * @param schema
         * @param templates
         * @returns {Window|*}
         * @private
         */
        var _newVNFModal = function (fg, fgPos, schema, templates) {
            return $uibModal.open({
                animation: false,
                templateUrl: '/static/js/fg-d3/modal_view/vnfModalView.html',
                controller: 'NewVNFModalController',
                controllerAs: 'VNFCtrl',
                size: 'lg',
                resolve: {
                    // the info passed to the controller of the modal
                    fg: function () {
                        return clone(fg)
                    },
                    fgPos: function () {
                        return clone(fgPos)
                    },
                    schema: function () {
                        return clone(schema)
                    },
                    templates: function () {
                        return clone(templates)
                    }
                }
            });
        };

        /**
         *
         * @param fg
         * @param fgPos
         * @param schema
         * @param templates
         * @returns {Window|*}
         * @private
         */
        var _editVNFModal = function (fg, fgPos, schema, templates) {
            return $uibModal.open({
                animation: false,
                templateUrl: '/static/js/fg-d3/modal_view/vnfModalView.html',
                controller: 'EditVNFModalController',
                controllerAs: 'VNFCtrl',
                size: 'lg',
                resolve: {
                    // the info passed to the controller of the modal
                    fg: function () {
                        return clone(fg)
                    },
                    fgPos: function () {
                        return clone(fgPos)
                    },
                    schema: function () {
                        return clone(schema)
                    },
                    templates: function () {
                        return clone(templates)
                    }
                }
            });
        };

        /**
         *
         * @param fg
         * @param fgPos
         * @param schema
         * @param elements
         * @returns {Window|*}
         * @private
         */
        var _newFlowRulesModal = function (fg, fgPos, schema, elements) {
            return $uibModal.open({
                animation: false,
                templateUrl: '/static/js/fg-d3/modal_view/linkModalView.html',
                controller: 'NewLinkModalController',
                controllerAs: 'LinkCtrl',
                size: 'lg',
                resolve: {
                    // the info passed to the controller of the modal
                    fg: function () {
                        return clone(fg)
                    },
                    fgPos: function () {
                        return clone(fgPos)
                    },
                    schema: function () {
                        return clone(schema)
                    },
                    elements: function () {
                        return clone(elements)
                    }
                }
            });
        };

        /**
         *
         * @param fg
         * @param fgPos
         * @param schema
         * @param elements
         * @returns {Window|*}
         * @private
         */
        var _editFlowRulesModal = function (fg, fgPos, schema, elements) {
            return $uibModal.open({
                animation: false,
                templateUrl: '/static/js/fg-d3/modal_view/linkModalView.html',
                controller: 'EditLinkModalController',
                controllerAs: 'LinkCtrl',
                size: 'lg',
                resolve: {
                    // the info passed to the controller of the modal

                }
            });
        };

        return {
            newEndpointModal: _newEndpointModal,
            editEndpointModal: _editEndpointModal,
            newVNFModal: _newVNFModal,
            editVNFModal: _editVNFModal,
            newFlowRulesModal: _newFlowRulesModal,
            editFlowRulesModal: _editFlowRulesModal
        };
    };

    fgModalService.$inject = ['$q', '$uibModal'];

    angular.module('fg-gui').service('FgModalService', fgModalService);
})();