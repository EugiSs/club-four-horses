document.addEventListener("DOMContentLoaded", () => {
  // Marquee
  marquee('#ticker-hero .ticker__marquee', 0.4);
  marquee('#ticker-bottom .ticker__marquee', 0.4);

  function marquee(selector, speed) {
    const line = document.querySelector(selector);
    const firstLine = line.firstElementChild;
    line.insertAdjacentHTML('beforeend', line.innerHTML);
    line.insertAdjacentHTML('beforeend', line.innerHTML);
    let i = 0;

    setInterval(() => {
      firstLine.style.marginLeft = `-${i}px`;
      i > firstLine.clientWidth ? i = 0 : i += speed;
    }, 0);
  }


  // Slider members
  const sliderMembersWrapper = document.querySelector(".members__items");
  const currMembersSlide = document.querySelector("#members-current");
  const totalMembersSlide = document.querySelector("#members-total");
  const memberSlides = document.querySelectorAll(".member");
  const memberArrowLeft = document.querySelector(".arrow_left");
  const memberArrowRight = document.querySelector(".arrow_right");

  let currentMember = 0;
  let totalMemberSlides = memberSlides.length;
  totalMembersSlide.textContent = totalMemberSlides;
  currMembersSlide.textContent = currentMember + 1;

  memberArrowLeft.addEventListener("click", prevSlide);
  memberArrowRight.addEventListener("click", nextSlide);

  function prevSlide() {
    currentMember--;
    if (currentMember < 0) currentMember = totalMemberSlides - 1;
    sliderMembersWrapper.style.transform = `translateX(-${currentMember * 100}%)`;
    currMembersSlide.textContent = currentMember + 1;
  }
  function nextSlide() {
    currentMember++;
    if (currentMember > totalMemberSlides - 1) currentMember = 0;
    currMembersSlide.textContent = currentMember + 1;
    sliderMembersWrapper.style.transform = `translateX(-${currentMember * 100}%)`;
  }

  // setInterval(() => {
  //   nextSlide();
  // }, 4000);

  window.addEventListener('resize', (e) => {
    calculateTotalSlides(totalMemberSlides);
  });

  calculateTotalSlides(totalMemberSlides);

  function calculateTotalSlides(value) {
    if (window.innerWidth >= 768) {
      value = Math.ceil(memberSlides.length / 2);
      totalMembersSlide.textContent = value;
    }
    if (window.innerWidth >= 1024) {
      value = Math.ceil(memberSlides.length / 3);
      totalMembersSlide.textContent = value;
    }
  }
})