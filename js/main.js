document.addEventListener("DOMContentLoaded", () => {
  // Scroll
  document.querySelectorAll(".scroll").forEach(elem => {
    elem.addEventListener("click", (e) => scrollToAncor(e, elem))
  })

  function scrollToAncor(e, elem) {
    e.preventDefault();
    const id = elem.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

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

  // Sliders
  function calcSlidesPerView(total) {
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      return total / 3
    }
    if (window.innerWidth >= 1024) {
      return total / 2
    }
    return 1
  }

  function changeSlide(e, slider) {
    let dir = 1;
    if (e && e.target.closest(".arrow_left")) {
      dir = -1;
    }
    slider.currentSlide += dir
    updateSlider(slider)
  }

  function updateSlider(slider) {
    if (slider.currentSlide < 0) {
      slider.currentSlide = Math.ceil((slider.totalSlides) / slider.slidesPerView) - 1;
    } else if (slider.currentSlide >= Math.ceil((slider.totalSlides) / slider.slidesPerView)) {
      slider.currentSlide = 0;
    };
    slider.wrapper.style.transform = `translateX(-${slider.currentSlide * 100}%)`;
  }

  function setSliderCounterText(selector, slider) {
    document.querySelector(selector).textContent = (slider.slidesPerView * (slider.currentSlide + 1));
  }

  function createSliderDots(parent, total) {
    for (let i = 0; i < total; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.dot = i;
      parent.append(dot);
    }
    changeActiveDot(parent, 0);
  }

  function changeActiveDot(parent, index) {
    let dots = parent.querySelectorAll(".dot");
    dots.forEach(dot => {
      dot.classList.remove("active");
    });
    dots[index].classList.add("active");
  }

  function checkSliderBounds(slider, selector) {
    if (slider.currentSlide === 0) {
      document.querySelector(`${selector} .arrow_left`).setAttribute('disabled', "")
      return
    }
    if (slider.currentSlide === slider.totalSlides - 1) {
      document.querySelector(`${selector} .arrow_right`).setAttribute('disabled', "")
      return
    }
    document.querySelector(`${selector} .arrow_right:disabled`)?.removeAttribute('disabled')
    document.querySelector(`${selector} .arrow_left:disabled`)?.removeAttribute('disabled')
  }

  // Slider stages
  const stagesArrows = document.querySelectorAll(".stages__arrow");
  const stagesPagination = document.querySelector(".stages__pagination");
  const stagesSlider = {
    wrapper: document.querySelector(".stages__items-wrapper"),
    slidesPerView: 1,
    currentSlide: 0
  };

  function getGridColumnsCount(element) {
    return window.getComputedStyle(element).getPropertyValue("grid-template-columns").split(" ").length;
  }

  stagesSlider.totalSlides = getGridColumnsCount(stagesSlider.wrapper);
  createSliderDots(stagesPagination, stagesSlider.totalSlides);

  stagesArrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      changeSlide(e, stagesSlider), changeActiveDot(stagesPagination, stagesSlider.currentSlide);
      checkSliderBounds(stagesSlider, ".stages");
    })
  });

  checkSliderBounds(stagesSlider, ".stages");

  stagesPagination.addEventListener("click", (e) => {
    if (e.target.closest(".dot")) {
      const dotIndex = Number(e.target.dataset.dot);
      stagesSlider.currentSlide = dotIndex;
      stagesSlider.wrapper.style.transform = `translateX(-${dotIndex * 100}%)`;
      changeActiveDot(stagesPagination, dotIndex);
    }
  })

  // Slider members
  const memberSlides = document.querySelectorAll(".member");
  const memberArrows = document.querySelectorAll(".member__arrow");
  const membersSlider = {
    totalSlides: memberSlides.length,
    slidesPerView: calcSlidesPerView(memberSlides.length),
    currentSlide: 0,
    wrapper: document.querySelector(".members__items")
  };

  document.querySelector("#members-total").textContent = memberSlides.length;
  setSliderCounterText("#members-current", membersSlider);

  memberArrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      changeSlide(e, membersSlider);
      setSliderCounterText("#members-current", membersSlider);
    })
  });

  setInterval(() => {
    changeSlide(null, membersSlider), setSliderCounterText("#members-current", membersSlider)
  }, 4000);

  window.addEventListener('resize', () => {
    if (calcSlidesPerView(membersSlider.totalSlides) !== membersSlider.slidesPerView) {
      membersSlider.slidesPerView = calcSlidesPerView(membersSlider.totalSlides);
      membersSlider.currentSlide = 0;
      updateSlider(membersSlider);
      setSliderCounterText("#members-current", membersSlider);
    }
    if (stagesSlider.totalSlides !== getGridColumnsCount(stagesSlider.wrapper)) {
      document.querySelectorAll(".stages .dot").forEach(dot => {
        dot.remove();
      })
      stagesSlider.totalSlides = getGridColumnsCount(stagesSlider.wrapper);
      createSliderDots(stagesPagination, stagesSlider.totalSlides);
    }
  });

})