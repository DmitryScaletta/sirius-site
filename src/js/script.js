document.getElementById('navbar-toggler').addEventListener('click', () => {
  document.getElementById('nav')            .classList.toggle('header__nav--expanded');
  document.getElementById('header-address') .classList.toggle('header__address--expanded');
  document.getElementById('header-contacts').classList.toggle('header__contacts--expanded');
  document.getElementById('header-buttons') .classList.toggle('header__buttons--expanded');
});

const moveTo = new MoveTo();
moveTo.registerTrigger(document.getElementById('button-up'));
