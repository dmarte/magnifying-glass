# Magnifying Glass Library

A useful library to create the Magnifying effect with ease.

### Installation
#### Step 1: Import the library and the styles
```html
<!-- In the HTML -->
<link href="./style.css" rel="stylesheet" />
```

```javascript
// In your main javascript file.
import "[path_to_library]/main.js"
```

### Step 2: Create the `div` with the handler class.

```html
<!-- The magnifying container -->
<div class="magnify-box"></div>
```

### Step 3: Define the background [^1] and foreground [^2] to be used.
```html
<div 
  class="magnify-box"
  data-background="/images/veronica_mars_poster_bw.jpg" 
  data-foreground="/images/veronica_mars_poster.jpg"
>
</div>
```

### Step 4 (optional): Set the zoom level.
You can choose to change the zoom level of the magnify glass using the data propert `data-zoom` to indicate the level of zoom in of the image.
```html
<div 
  class="magnify-box"
  data-zoom="2"
  data-background="/images/veronica_mars_poster_bw.jpg" 
  data-foreground="/images/veronica_mars_poster.jpg"
>
</div>
```

### How it works?

1. The library will try to catch all `.magnify-box` containers.
2. Then for each `.magnify-box` it will create the necessary dom children to build the magnify glass effect.
3. The library will attach the events for desktop and mobile in order to drag the magnify box.

### Contributing
Thank you for considering contributing to the project! You can send any bug report or suggestions as an issue of this repository.
[@dmarte/magnifying-glass](https://github.com/dmarte/magnifying-glass)

[^1]: The background is the image to be used as background of main the container.
[^2]: The **foreground** is the image to be used inside the magnify glass.


