---
author: Siddhartha Mukherjee
date: '2020-03-19T07:00:00.000Z'
hero_image: ../static/alfons-taekema-bali.jpg
title: Caveats and Uses for Leading Trim (Text Crop)
---
The W3C working group have a draft proposal for a leading-trim property which allows authors to control the white space above and below text. This can prove useful for aligning text to the middle of an icon, making sure padding around a button is consistent, or used to help align images with text.

## The Workaround

For a w hile,   the re has existed a workaround created by Kevin Powel. It has sometimes been called text cropping, or line-height cropping. It works by applying `::before` and `::after` pseudo-elements and applying a negative margin to pull surrounding space in towards the text, therefore removing the white space. Recently I've been exploring this workaround, what you can do with it, and if there are other ways to achieve the same result without having to use pseudo-elements. I want to share what I've learned. I won't go into the specifics about how the technique works as there are several ways to achieve this, including my own. However, I will link to the great resources regarding these different methods below.

## Applying to the Top Only

The main downside is if you happen to use the `::before` and `::after` pseudo-elements for any other workarounds or hacks. One being of which is when pseudo-elements are used to style bullets for unordered or ordered lists. Until the `::marker` pseudo-element is well supported (hopefully not too long now), this makes things a little tricky.

A way around this is to only to apply leading trim to the top of the text (the most noticeable in my opinion) so you can still use the `::after` pseudo-element for the bullet. In some instances however, it will be more noticeable that the text is closer to the top than it is to the bottom. You can, of course, avoid using a pseudo-element to style the bullet and instead rely on CSS using display: list-item to style bullets but it doesn't provide as much level of control.

## When to Apply it

Something to think about is when you will use this technique. Do you use it for one-off cases? Perhaps for aligning text to an icon. Or perhaps to achieve consistent padding around a button. One recent idea by Mark Dalgleish has been that "Components shouldn't contain surrounding white space". You could, therefore, apply this to most if not all elements (barring a few block elements where pseudo-element interfere with the layout). I'd like to see more experimentation with how this affects vertical rhythm. Line-height is one of the core components of setting a vertical rhythm. If the line-height is being cropped, how does this impact the vertical alignment when sat alongside and above and below other text? Perhaps it's not something we need to worry about, or maybe it is?

## Support in Design Tools

Another consideration is how a design is translated for development and vice versa. Not all design tools provide a way to measure the distance between the baseline of text. Some thought will be required for your team conveys these details and how the designer works within these limitations.

Other Ways to Implement Leading Trim
There are some other ways to remove the white space above and below text but they come with some considerable complications.

## Using Components

One way is if you work with components, you can remove the white space using empty span or div elements as part of your component, negating the need to use pseudo-elements. With recent frameworks where the design system is based on primitives (such as Styled System), you could in theory control this on a system-wide level by ensuring all text components have access to these capabilities. I haven't yet tried this but I imagine would be achievable.

## Using CSS calc()

Another way would be to use the CSS calc() function to negate the impact of the line-height. However, this requires special attention to whether there is padding on the element, and to be careful to only run the calculations for block values (top and bottom). I experimented a little with this, and while it's ok for one-off scenarios it works better when you use CSS variables for all your values, so you don't have to remember to apply the calculation (even then it gets pretty complicated).

## My Solution

I wanted a solution (leading-trim.css) which wasn't too verbose and works in the majority of cases. Therefore I created a method that avoids having to apply it using classes (as in .leading-trim) or having to resort to using preprocessors.

```css
* {
  --cap-height: 0.75;
  --leading-trim-over-adjustment: 0em;
  --leading-trim-under-adjustment: 0em;
  --line-height: 1.5;
  
  --unset: unset;
  --leading-trim: var(--unset);
  --leading-trim-over: var(--unset);
  --leading-trim-under: var(--unset);
}

::before, ::after {
  display: block;
}

::before {
  content: var(--leading-trim, var(--leading-trim-over, unset));
  margin-bottom: calc((var(--cap-height) - var(--line-height, 1)) * 0.5em - var(--leading-trim-over-adjustment));
}

::after {
  content: var(--leading-trim, var(--leading-trim-under, unset));
  margin-top: calc((var(--cap-height) - var(--line-height, 1)) * 0.5em - var(--leading-trim-under-adjustment));
}
```

Using the above technique you can apply leading-trim to either above or below the text using the following:

```css
body {
  /* Remember to set the line-height */
  line-height: var(--line-height);
}

h1 {
  --leading-trim: '';
  
  /* Or */
  --leading-trim-over: '';
  --leading-trim-under: '';
}
```

You can adjust the cropping individual fonts by changing:

the value of the cap height, which is a percentage of the font size.
any adjustments to the over and under trim values.
the default line-height. If the line-height changes be sure to override this where necessary.

```css
* {
  --cap-height: 0.75;
  --leading-trim-over-adjustment: 0em;
  --leading-trim-under-adjustment: 0em;
  --line-height: 1.5;
}
```

## Other Resources

There are a lot of useful resources on the subject which are worth reading.

* Deep dive CSS: font metrics, line-height and vertical-align
* Line-height Crop — a simple CSS formula to remove top space from your text
* Cropping Away Negative Impacts of Line Height
* The EM Square
* Text Crop Tool