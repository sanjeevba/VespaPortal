// Global Ajax Web Api proxy
  // Wrapper provided by Microsoft
  
  (function (webapi, $) {
    function safeAjax(ajaxOptions) {
      const deferredAjax = $.Deferred();
      shell.getTokenDeferred().done((token) => {
        // add headers for AJAX
        if (!ajaxOptions.headers) {
          $.extend(ajaxOptions, {
            headers: {
              __RequestVerificationToken: token,
            },
          });
        } else {
          ajaxOptions.headers.__RequestVerificationToken = token;
        }
        $.ajax(ajaxOptions)
          .done((data, textStatus, jqXHR) => {
            validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
          }).fail(deferredAjax.reject); // AJAX
      }).fail(function () {
        deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
      });
      return deferredAjax.promise();
    }
    webapi.safeAjax = safeAjax;
  }(window.webapi = window.webapi || {}, jQuery));