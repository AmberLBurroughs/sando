$(document).ready(function() {

  // display corrent plan for selected tab, update tab style
  $('main').on('click', 'button.tabs, .tab_link', function(){

    var activeClass = 'btn__active';
    var selectedPlan = $(this).data('plan-title');

    $('#plan__agreement').hide(1000);
    $('button.tabs').removeClass(activeClass);

    ($(this).data('tab-type') === 'btn')? $(this).addClass(activeClass): $(`.${selectedPlan}`).addClass(activeClass);

    (selectedPlan === 'gourmet__plan')? handleGourmetSelect() : handleBasicSelect();

    scrollTo();
  });

  // show basic plan information hide gourmet
  function handleGourmetSelect(){
    $('.gourmet').show(1000);
    $('.basic').hide(1000);
  }

  // show gourmet plan information hide basic
  function handleBasicSelect(){
    $('.basic').show(1000);
    $('.gourmet').hide(1000);
  }

  // animated scroll for showing plan detail for tabs
  function scrollTo(){
    $('html, body').animate({
      scrollTop: $('#plan__description').offset().top
    }, 800)
  }

  // collect selected plan information and display plan  overview with plan agreement
  $('article.plan__card').on('click', function(){
    var $this = $(this);
    var sandwichPlan = {
      plan: $this.data('plan'),
      price: $this.data('price'),
      quantity: $this.data('count')
    }

    $('#gourmet__details, #basic__details').hide(1000);

    showSelectedPlan(sandwichPlan);
  });

  // create user plan selection overview and plan agreement
  // if user select 200+ plan show conact form
  function showSelectedPlan(sandwichPlan){
    var $planAgreement = $('#plan__agreement');
    $planAgreement.empty();
    var planAgreement = '';
    if(sandwichPlan.price === 'TBD'){
      planAgreement = `
      <h4>you have selected the</h4>
      <h2>${sandwichPlan.plan} Sandwich Plan</h2>
      <h4>${sandwichPlan.quantity} sandwiches</h4>
      <form id="form">
        <section id="ask__us">
          <p class="spacer">Input your email and desired quantity</p>
          <label for="email">Email
          <input type="email" id="email" placeholder="your@email.com" required />
          </label>
          <label for="plan__quantity">Quantity
          <input id="plan__quantity" type="number" min="201" placeholder="quantity" required />
          </label>
        </section>
        <section class="agreement">
          <section class="spacer">
            <input type="checkbox" class="form-checkbox" id="agree__check">
            <label for="check-one">By checking this box, I acknowledge I may receive the most delicious sandwich I've ever had.</label>
          </section>
          <button id="send__sandwich" class="btn disabled spacer" disabled data-plan="${sandwichPlan.plan}" data-price="${sandwichPlan.price}">Send me a sandwich!</button>
          <button
          title="view sandwich plan"
          class="blu__link tab_link spacer"
          data-plan-title="${sandwichPlan.plan}__plan"
          data-tab-type="link">Back to ${sandwichPlan.plan} plans &#8594;</button>
        </section>
      </form>
    `
    }
    else {
      planAgreement = `
      <h4>you have selected the</h4>
      <h2>${sandwichPlan.plan} Sandwich Plan</h2>
      <h4>${sandwichPlan.quantity} sandwiches at $${sandwichPlan.price}/month</h4>
      <section class="agreement">
        <section class="spacer">
          <input type="checkbox" class="form-checkbox" id="agree__check">
          <label for="check-one">By checking this box, I acknowledge I may receive the most delicious sandwich I've ever had.</label>
        </section>
        <button id="send__sandwich" class="btn disabled spacer" disabled data-plan="${sandwichPlan.plan}" data-quantity="${sandwichPlan.quantity}" data-price="${sandwichPlan.price}">Send me a sandwich!</button>
        <button
          title="view sandwich plan"
          class="blu__link tab_link spacer"
          data-plan-title="${sandwichPlan.plan}__plan"
          data-tab-type="link">Back to ${sandwichPlan.plan} plans &#8594;</button>
      </section>
    `
    }

    $planAgreement.append(planAgreement);
    $planAgreement.show(1000);
  }

  // validate plan agreement checkbox, enable/diable submit button
  $('#plan__agreement').on('change', '#agree__check',function(event){
      var $sendSandwich = $('#send__sandwich');
      if($('#agree__check').is(':checked')){
        $sendSandwich.removeClass('disabled')
        $sendSandwich.prop('disabled', false);
      } else {
        $sendSandwich.addClass('disabled')
        $sendSandwich.prop('disabled', true);
      }
  });

  /* reset page to display default plan, show conformation in a modal and send payload to server would happen here */
  $(document).on('click', '#send__sandwich', function(event){
    event.preventDefault();

    $('#form')[0].checkValidity()

    // var planPayload = {
    //   plan: $(this).data('plan'),
    //   quantity: $(this).data('quantity'),
    //   price: $(this).data('price'),
    // }

    // if(planPayload.price === 'TBD'){
    //   planPayload['email'] = $('#email').val();
    //   planPayload['quantity'] = $('#plan__quantity').val();
    // }

    // show modal with order info
    // var modelContent = `
    //   <h2>A delicious sandwich is coming your way!</h2>
    //   <h3>${planPayload.plan} Plan</h3>
    //   <h4>${planPayload.quantity} sandwiches per month.</h4>
    // `
    // $('.modal__content').empty();
    // $('.modal__content').append(modelContent);
    // $('#modal__overlay').removeClass('hide');

    // // reset page
    // $('#plan__agreement').hide(1000);
    // $('button .gourmet__plan').addClass('btn__active');
    // handleGourmetSelect();

    // send payload would happen here
  });

  // hide modal
  $('.close').on('click', function(){
     $('#modal__overlay').addClass('hide');
  });
});
