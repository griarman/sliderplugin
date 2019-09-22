# Slider Plugin

This is a plugin, which helps you to create slider in a easy way.

## Code example

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Slider</title>
    <script src="./jquery-3.4.1.min.js"></script>
    <script src="./slider.js"></script>
    <script>
        $(document).ready(function () {
            $('.example_slider').slider({
                slideShow: true,
                interval : 3000,
                animation: 'slide'
            });
        })
    </script>
    <link rel="stylesheet" href="./slider.css">
</head>
<body>
    <ul class="example_slider">
        <li data-url='./assets/images/1.jpg' data-type='image'></li>
        <li data-url='./assets/videos/video.mp4' data-type='video'></li>
        <li data-url='./assets/images/2.jpg' data-type='image'></li>
    </ul>
</body>
</html>
    
```

## Installation

At first you should attach files slider.js and slider.css to your project. 
Then call .slider method on your element which must become slider.
.slider method should get object with this properties: slideShow(true / false), interval (ms), animation.
Your slider element's children must have these data attributes: data-url(url), data-type(image/video).
