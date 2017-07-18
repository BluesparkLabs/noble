/**
 * @file
 * Provides common drupal behaviors used by the noble theme.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.nobleTheme = {};

  function refreshDeviceValue() {
    Drupal.nobleTheme.device = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  }

  /**
   * Initializes the noble theme js with global settings.
   *
   * @type {{attach: attach}}
   */
  Drupal.behaviors.nobleThemeInit = {
    attach: function () {
      // Refresh breakpoint value.
      $(window).resize(function () {
        refreshDeviceValue();
      }).resize();
    }
  };

})(jQuery, Drupal);
