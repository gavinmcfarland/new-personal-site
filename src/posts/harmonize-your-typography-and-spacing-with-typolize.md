---
author: Siddhartha Mukherjee
date: '2020-03-19T07:00:00.000Z'
hero_image: ../static/alfons-taekema-bali.jpg
title: Harmonize your Typography and Spacing with Typolize
---

For the last half a decade I've been obsessed with integrating maths into design. After experimenting with a lot of different ideas, I'm now ready to introduce a new way to manage typography. Typolize was created after I had a thought to stop trying to create a "framework" and use a style reset, but instead of taking the styles down to nothing, I wanted to provide a baseline for typography and spacing which just works.

Typolize is a system of numbers, ratios and patterns. I've tried to leave out as much opinion about how you prefer your style resets to work and instead provide enough to help you manage the typesetting and spacing for your application or site.

## How it Works
The reset itself is actually very basic. I have made some assumptions about what makes for good typography on the web, like including an option to crop unnecessary white space from text. Margins are applied to each type element like headers, paragraphs, blockquotes and are unset for containers like divs and sections. This was originally created in mind for text-heavy sites so this is the way margins have been implemented, but you could fork it and customize it for your own needs.

## Ratios
At the heart of the reset is a set of variables which affect the modular scale of the typography and spacing. Customising the variables will give a completely different feel to the proportion and scale of your site or application.

```css
:root {
  --font-base: 16px;
  --font-ratio: 1.333;
  --line-ratio: 1.5;
  --spacing-ratio: 1;
}
```

font-base controls the default font size for the body text. Increasing this will affect the size of all other type elements like headers and blockquotes. If it's a blog where writing is the primary focus you might want to use a large font-base, but if it's an application then you might want to set a small font-base to fit more in.
font-ratio determines the scale of which the font sizes increase. A ratio of 1.333 with a font base of 16px will give a font size of ~21px. Increasing the font-ratio will create more contrast between each font size.
line-ratio sets the default line height of all type elements. It's also used to calculate the spacing between type elements in combination with the spacing-ratio, since space between text also makes up the white space on the page.
spacing-ratio sets the scale of the white space between elements. This enables you to make it more condensed or liberal. If you would prefer not to affect the density of the spacing then you can leave this as 1 and it won't interfere.

## Variables
Typolize creates CSS variables for you to use in your designs for things like font sizes, margins and paddings. These variables are based on a modular scale using the following equation base * pow(ratio, n) where n is the nth number in the series.

The available variables are:

--font-size-<-2..10> For setting the font size of an element.
--em-<-2..10> For setting the spacing relative to the font size
--rem-<-2..10> For setting the spacing relative to the root/base font size
Typesetting
Generating a scale is useful to create typography which shares a common derivative, but sometimes this can lack contrast. It's useful to pick out certain steps in the scale to create a more distinctive look.

You can play around with different numbers like Fibonacci numbers to create varied and interesting scales. Below is an example of customizing the typesetting in Typolize.

```css
:root {
  --font-size-body: var(--font-size-0);
  --font-size-h1: var(--font-size-7);
  --font-size-h2: var(--font-size-5);
  --font-size-h3: var(--font-size-3);
  --font-size-h4: var(--font-size-2);
  --font-size-h5: var(--font-size-1);
  --font-size-h6: var(--font-size-0);
  --font-size-blockquote: var(--font-size-1);
}
```

With this level of control, you have complete freedom to really affect the look and feel of your site or application.

Margins are applied to the top and bottom of type elements like headers, paragraphs, and blockquotes. By default, they are as follows.

```css
*+* {
	margin-top: var(--em-1);
}

h1, h2, h3, h4, h5, h5, h6 {
  margin-top: var(--em-3);
	margin-bottom: var(--em-2);
}
```

This provides a good balance between headers and paragraphs.

## Responsive
Typolize is great for responsive designs because you can adjust the scale used for each breakpoint by overriding the ratios. You can work either from a mobile-first perspective or use desktop as the basis and work down/up.

Below is an example of what I use on my own site to customize the design to accommodate for different breakpoints.

```css
@media (min-width: 1500px) {
	:root {
		--font-base: 18px;
	}
}

@media (max-width: 900px) {
	:root {
		--spacing-ratio: 0.666;
		--font-ratio: 1.2;
	}
}

@media (max-width: 375px) {
	:root {
		--font-base: 14px;
		--spacing-ratio: 0.5;
	}
}
```

## Final Thoughts
There are a lot more things I'd like to explore with this reset. One example is the ability to differentiate between horizontal and vertical spacing. If you look through the stylesheet you'll be able to see some variables I haven't yet documented or formalised but eventually, these will also become part of the main framework. I'm also looking at ways to make it easier to customise. If you do give it a try, I would love to hear your feedback, what works for you and what doesn't. You can view the project on Github.

