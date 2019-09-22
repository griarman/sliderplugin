$.fn.slider = function (options) {
    this.each(function () {
        const target = $(this);
        const { slideShow = false, interval = 5000, animation } = options;
        let current = 0;
        let elements = target.children().map((index, el) => {
            return {
                type: el.dataset.type,
                url: el.dataset.url
            };
        });
        let slider = $('<div class="sliderContainer"></div>'),
            sliderElements = $('<div class="sliderElements"></div>'),
            sliderCircles = $('<div class="sliderCircles"></div>');

        elements.each(i => {
           let element = elements[i], content, play_pause,
               active = current === i ? 'active' : '',
               activeElement = current === i ? 'activeElement' : '',
               div = $(`<div class="content ${activeElement}"></div>`),
               circle = $(`<div class="circle ${active}"></div>`);

           switch (element.type) {
               case 'image':
                   content = $(`<img src="${element.url}">`);
                   break;
               case 'video':
                   content = $(`<video src="${element.url}"></video>`);
                   play_pause = $('<div class="video"></div>');

                   div.append(play_pause);
           }

           sliderCircles.append(circle);
           div.append(content);
           sliderElements.append(div);
        });

        slider.append(sliderElements, sliderCircles);
        target.after(slider).remove();
    })
};
