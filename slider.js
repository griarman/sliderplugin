$.fn.slider = function (options) {
    this.each(function () {
        const target = $(this);
        const { slideShow = false, interval = 5000, animation = 'slide'} = options;
        let current = 0, animationStarted = false, animate;
        let elements = target.children().map((index, el) => {
            return {
                type: el.dataset.type,
                url: el.dataset.url
            };
        });
        let slider = $('<div class="sliderContainer"></div>'),
            sliderElements = $('<div class="sliderElements"></div>'),
            sliderCircles = $('<div class="sliderCircles"></div>'),
            left, right;

        elements.each(i => {
           let element = elements[i], content, play_pause,
               active = current === i ? 'active' : '',
               activeElement = current === i ? 'activeElement' : '',
               div = $(`<div class="content ${activeElement}"></div>`),
               circle = $(`<div class="circle ${active}"  data-el="${i}"></div>`);

           switch (element.type) {
               case 'image':
                   content = $(`<img src="${element.url}">`);
                   break;
               case 'video':
                   content = $(`<video src="${element.url}"></video>`);
                   play_pause = $('<div class="video"></div>');
                   content.click(playVideo);
                   play_pause.click(playVideo);

                   function playVideo() {
                       if (!play_pause.hasClass('playing')) {
                           if (animationStarted) return;
                           div.stop();
                           content.get(0).play();
                           clearInterval(animate)
                       }
                       else {
                           content.get(0).pause();
                           checkAnimate(slideShow)
                       }
                       play_pause.toggleClass('playing');
                   }

                   div.append(play_pause);
                   break;
           }

           sliderCircles.append(circle);
           div.append(content);
           sliderElements.append(div);
        });

        sliderCircles.on('click', '.circle', function () {
            checkAnimate(slideShow);
            changeSlide(parseInt(this.dataset.el, 10));
        });

        target.after(slider).remove();

        if (elements.length > 1) {
            left = $('<div class="leftArrow"></div>');
            right = $('<div class="rightArrow"></div>');

            left.click(() => {
                current = parseInt(sliderCircles.find('.active').get(0).dataset.el, 10);
                let leftElement = current === 0 ? elements.length - 1 : current - 1;
                checkAnimate(slideShow);
                changeSlide(leftElement);
            });
            right.click(() => {
                checkAnimate(slideShow);
                changeElement(current);
            });
        }

        slider.append(left, sliderElements, right, sliderCircles);

        if(slideShow) animate = setInterval(goOn, interval);

        function changeSlide(current) {
            let activeVideo = sliderElements.find('.activeElement .video');
            if(activeVideo.length && activeVideo.hasClass('playing')) activeVideo.next().get(0).pause();
            animationStarted = true;
            sliderElements.find('.activeElement').animate({
                opacity: 0,
            }, interval / 10, 'linear', function () {
                $(this).removeClass('activeElement');

                sliderElements.find('.content').eq(current).animate({
                    opacity: 1,
                    display: 'flex'
                }, interval / 10, 'linear',function () {
                    animationStarted = false;
                    changeActive(current);
                }).addClass('activeElement');
            });
        }

        function changeActive(i) {
            let circle = sliderCircles.find('.circle');
            circle.removeClass('active');
            circle.eq(i).addClass('active');
        }

        function changeElement(current) {
            current = parseInt(sliderCircles.find('.active').get(0).dataset.el, 10);
            let rightElement = current === elements.length - 1 ? 0 : current + 1;
            changeSlide(rightElement);
        }

        function goOn() {
            changeElement(parseInt(sliderCircles.find('.circle.active').get(0).dataset.el), 10);
        }

        function checkAnimate(slideShow) {
            if (slideShow) {
                clearInterval(animate);
                sliderElements.find('.content').stop();
                animate = setInterval(goOn, interval);
            }
        }
    });

    return this;
};
