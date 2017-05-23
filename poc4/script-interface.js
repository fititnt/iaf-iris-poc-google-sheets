// Variable to hold request
var request;

$('#form-configuracao').on('submit', function(event) {
  event.preventDefault();
})

// Salva itens
$('#salvar').on('click', function () {
  localStorage.setItem('poc4-webapp-url', $('#webapp-url').val())
  localStorage.setItem('poc4-pagina', $('#pagina').val())
})


// Bind to the submit event of our form
$("#formulario").submit(function (event) {

  // Abort any pending request
  if (request) {
    request.abort();
  }
  // setup some local variables
  var $form = $(this);

  // Let's select and cache all the fields
  var $inputs = $form.find("input, select, button, textarea");

  // Serialize the data in the form
  var serializedData = $form.serialize();

  // Let's disable the inputs for the duration of the Ajax request.
  // Note: we disable elements AFTER the form data has been serialized.
  // Disabled form elements will not be serialized.
  $inputs.prop("disabled", true);

  // Fire off the request to /form.php
  request = $.ajax({
    url: jQuery('#webapp-url').val(),
    type: "post",
    data: serializedData
  });

  // Callback handler that will be called on success
  request.done(function (response, textStatus, jqXHR) {
    // Log a message to the console
    console.log("Hooray, it worked!");
    console.log(response);
    console.log(textStatus);
    console.log(jqXHR);
  });

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown) {
    // Log the error to the console
    console.error(
      "The following error occurred: " +
      textStatus, errorThrown
    );
  });

  // Callback handler that will be called regardless
  // if the request failed or succeeded
  request.always(function () {
    // Reenable the inputs
    $inputs.prop("disabled", false);
  });

  // Prevent default posting of form
  event.preventDefault();
});

// Carrega itens
if (localStorage.getItem('webapp-url')) {
  $('#webapp-url').val(localStorage.getItem('poc4-webapp-url'));
}
if (localStorage.getItem('pagina')) {
  $('#pagina').val(localStorage.getItem('poc4-pagina'));
}

/* 
  An Accessible Bootstrap Tab Panel with WAI-ARIA, inicio
  https://codepen.io/stephanmax/pen/daswq
*/
$(document).ready(function () {
  var panel = new Tabpanel("myTab");
});

function Tabpanel(id) {
  this._id = id;
  this.$tpanel = $('#' + id);
  this.$tabs = this.$tpanel.find('.tab');
  this.$panels = this.$tpanel.find('.tab-pane');

  this.bindHandlers();
  this.init();
}

Tabpanel.prototype.keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

Tabpanel.prototype.init = function () {
  var $tab;

  this.$panels.attr('aria-hidden', 'true');
  this.$panels.removeClass('active in');

  $tab = this.$tabs.filter('.active');

  if ($tab === undefined) {
    $tab = this.$tabs.first();
    $tab.addClass('active');
  }

  this.$tpanel
    .find('#' + $tab.find('a').attr('aria-controls'))
    .addClass('active in').attr('aria-hidden', 'false');
}

Tabpanel.prototype.switchTabs = function ($curTab, $newTab) {
  var $curTabLink = $curTab.find('a'),
    $newTabLink = $newTab.find('a');

  $curTab.removeClass('active');
  $curTabLink.attr('tabindex', '-1').attr('aria-selected', 'false');

  $newTab.addClass('active');
  $newTabLink.attr('aria-selected', 'true');

  this.$tpanel
    .find('#' + $curTabLink.attr('aria-controls'))
    .removeClass('active in').attr('aria-hidden', 'true');

  this.$tpanel
    .find('#' + $newTabLink.attr('aria-controls'))
    .addClass('active in').attr('aria-hidden', 'false');

  $newTabLink.attr('tabindex', '0');
  $newTabLink.focus();
}

Tabpanel.prototype.bindHandlers = function () {
  var self = this;

  this.$tabs.keydown(function (e) {
    return self.handleTabKeyDown($(this), e);
  });

  this.$tabs.click(function (e) {
    return self.handleTabClick($(this), e);
  });
}


Tabpanel.prototype.handleTabKeyDown = function ($tab, e) {
  var $newTab, tabIndex;

  switch (e.keyCode) {
    case this.keys.left:
    case this.keys.up: {

      tabIndex = this.$tabs.index($tab);

      if (tabIndex === 0) {
        $newTab = this.$tabs.last();
      }
      else {
        $newTab = this.$tabs.eq(tabIndex - 1);
      }

      this.switchTabs($tab, $newTab);

      e.preventDefault();
      return false;
    }
    case this.keys.right:
    case this.keys.down: {

      tabIndex = this.$tabs.index($tab);

      if (tabIndex === this.$tabs.length - 1) {
        $newTab = this.$tabs.first();
      }
      else {
        $newTab = this.$tabs.eq(tabIndex + 1);
      }

      this.switchTabs($tab, $newTab);

      e.preventDefault();
      return false;
    }
  }
}

Tabpanel.prototype.handleTabClick = function ($tab, e) {
  var $oldTab = this.$tpanel.find('.tab.active');
  this.switchTabs($oldTab, $tab);
}

/* 
  An Accessible Bootstrap Tab Panel with WAI-ARIA, fim
*/