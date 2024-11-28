---
title: "Customising This Website"
date: 2024-11-27T22:29:49+01:00
topics: ["updates", "hugo", "web development"]
---

{{< lead >}}
**"How can I change the look and feel of my Hugo website?"** A step-by-step guide on how to customise a Hugo website using Tailwind CSS, JavaScript and Hugo's templating system.
{{< /lead >}}

Out of the box, Hugo and Congo provide a solid foundation for building a clean, responsive website. However, the default style might not align with your vision, or you may want to incorporate custom functionality. In this post, I'll walk you through how I customized my Hugo website. By the end, you'll have the tools to enhance both the design and interactivity of your site.

If you're curious about why Hugo is a great choice, check out [this post](/blog/why-i-built-this-blog-with-hugo/). To learn how to deploy your own Hugo website, refer to [this guide](/blog/setting-up-and-deploying-this-blog/).

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that takes a unique approach to styling web pages. Unlike traditional CSS frameworks with predefined components and rigid designs, Tailwind provides low-level utility classes, allowing you to build custom designs directly in your HTML. This approach can save time and deliver a polished, professional look without the need for repetitive CSS coding.

### Building the theme CSS from source

If you're using the Congo theme, your website already leverages a default Tailwind CSS configuration. To modify this setup—or if your theme doesn't use Tailwind—you'll need to install Tailwind dependencies and configure the `tailwind.config.js` file. This will enable Tailwind's Just-In-Time (JIT) compiler and allow you to rebuild the theme CSS from source. For this step, ensure that [npm](https://docs.npmjs.com/cli/v7/configuring-npm/install) is installed on your local machine.

```bash
cd themes/congo
npm install
# and if no tailwind.config.js file exists:
npx tailwindcss init 
```

{{< alert "circle-inf" >}}
**Note:** to use the JIT compiler, you cannot use Hugo Modules to install your theme - you must go down either the git submodule or manual install routes mentioned in my [previous post](/blog/setting-up-and-deploying-this-blog/).
{{< /alert >}}

If using a theme that does not include Tailwind out of the box, you will just need to add the necessary paths in your `tailwind.config.js` file:

{{< showcode JS "linenos=false" "themes/congo/tailwind.config.js" >}}
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./themes/congo/layouts/**/*.html",
    "./themes/congo/content/**/*.{html,md}",
  ],
  // and more...
};
{{< /showcode >}}

With the dependencies installed and the `tailwind.config.js` file configured, you can use Tailwind CLI to invoke the JIT compiler:
```bash
cd ../..
./themes/congo/node_modules/tailwindcss/lib/cli.js -c ./themes/congo/tailwind.config.js -i ./themes/congo/assets/css/main.css -o ./assets/css/compiled/main.css --jit
```

The compiler reads the `themes/congo/tailwind.config.js` file and generates a compiled CSS file in the `assets/css/compiled/` folder. This file contains all the necessary CSS for the files specified in the `content` array. 

One important consideration: you can only use Tailwind classes in these files if they are *already* defined in the `tailwind.config.js` file. Because of how Hugo handles file hierarchy, the `tailwind.config.js` file in your project will automatically override the default configuration provided by the theme, including the compiled CSS file (`themes/congo/assets/css/compiled/main.css`).

### Customizing the Default Theme

Here are the changes I made to the default Tailwind CSS theme bundled with Congo:

#### Inline code blocks

*Example*: `this is some inline code`

{{< showcode JS "linenos=false" "themes/congo/tailwind.config.js" >}}
"code:not(pre code)": {
    color: "inherit", // Uses the parent text color
    backgroundColor: "rgb(var(--color-neutral-100))", // Light gray background
    padding: "0.2em 0.4em", // Small padding
    borderRadius: "6px", // Rounded corners
    fontWeight: "400", // Normal font weight
    fontSize: "0.9em", // Slightly smaller than normal text
},
'code::before': {
    content: '""'
},
'code::after': {
    content: '""'
},
{{< /showcode >}}

1. `code:not(pre code)` - Targets all `<code>` elements that are not inside `<pre>` tags. i.e inline code blocks
2. `code::before` and `code::after` - Removes the backticks that Hugo would automatically add around inline code blocks

#### Links

*Example*: [this is a link](https://www.google.com)

{{< showcode JS "linenos=false" "themes/congo/tailwind.config.js" >}}
a: {
textDecoration: "underline", // All links have an underline
textDecorationColor: theme("colors.primary.300 / 1"), // The underline color uses your primary color at 300 weight
fontWeight: "500", // Links are slightly bold (medium weight)
"&:hover": {
    color: theme("colors.neutral.DEFAULT / 1"), // Text color changes to neutral on hover
    textDecoration: "none", // Removes the underline on hover
    backgroundColor: theme("colors.primary.600 / 1"), // Adds a primary color background on hover
    borderRadius: "0.09rem", // Slightly rounds the corners on hover
    },
},
"a code": {
    color: "var(--tw-prose-code)", // Code snippets within links use the same color as the code blocks
},
{{< /showcode >}}

1. `a` - Configures the base styling for links (`<a>` tags).
2. `&:hover` - Modifies the styling for links when hovered over
3. `a code` - Ensure that code snippets within links use the proper code color variable

#### Keyboard inputs

*Example*: <kbd>CMD</kbd> + <kbd>P</kbd>

{{< showcode JS "linenos=false" "themes/congo/tailwind.config.js" >}}
kbd: {
    backgroundColor: theme("colors.neutral.200 / 1"),  // Light gray background
    padding: "0.1rem 0.4rem",     // Small padding, more on sides
    borderRadius: "0.25rem",    // Slightly rounded corners
    fontSize: "0.9rem",     // Slightly smaller than normal text
    fontWeight: "600",   // Semi-bold text
}
{{< /showcode >}}

This configures the styling for keyboard inputs (`<kbd>` tags).

#### Highlighted text

*Example*: <mark>important text</mark>

{{< showcode JS "linenos=false" "themes/congo/tailwind.config.js" >}}
mark: {
    color: theme("colors.neutral.800 / 1"),   // Dark text color
    backgroundColor: theme("colors.secondary.200 / 1"), // Light highlight color
    padding: "0.1rem 0.2rem",  // Small padding
    borderRadius: "0.12rem",   // Slightly rounded corners
}
{{< /showcode >}}

This configures the styling for highlighted text (`<mark>` tags).

#### List spacing

{{< showcode JS "linenos=false" "themes/congo/tailwind.config.js" >}}
'ol': {
    'li': {
    marginTop: '0.5em', // Adds 0.5em spacing above and below each list item
    marginBottom: '0.5em', // Adds 0.5em spacing above and below each list item
    'p': {
        margin: '0', // Removes margins from any paragraph (p) elements inside list items
    },
    },
},
'ol > li > ul': {
    marginTop: '0.25em', // Adds 0.25em spacing above and below nested unordered lists
    marginBottom: '0.25em', // Adds 0.25em spacing above and below nested unordered lists
},
'ol > li > ul > li': {
    marginTop: '0.125em', // Adds 0.125em spacing above and below nested list items
    marginBottom: '0.125em', // Adds 0.125em spacing above and below nested list items
    paddingLeft: '0.375em', // Adds 0.375em left padding to indent nested list items
    'p': {
    margin: '0', // Removes margins from any paragraph (p) elements inside list items
    },
},
'ol > li:has(> ul)': {
    marginBottom: '0', // Removes bottom margin to prevent extra spacing when a list item contains a nested list
},
{{< /showcode >}}

This targets ordered list items (`ol > li`), nested unordered lists (`ol > li > ul`), nested list items (`ol > li > ul > li`) and list items containing lists (`ol > li:has(> ul)`). The main purpose of this is to ensure that the spacing between list items is consistent and that paragraphs inside list items have no margins.

#### Code Blocks

While writing my [Obsidian periodic notes post](/blog/obsidian-periodic-notes/), I noticed that some of the code blocks were quite long, making the content harder to navigate. To improve the user experience, I added expand/collapse functionality to these code blocks. This involved creating custom Tailwind CSS classes, writing some JavaScript, and working with Hugo's templating system. Along the way, I also added titles to the code blocks and adjusted the syntax highlighting logic.

Thankfully, Tailwind CSS allows you to define reusable utility classes beyond its default set. This is especially useful for grouping related styles and incorporating raw CSS properties that aren't available as Tailwind utilities. You can use the `@apply` directive within these custom classes to include existing Tailwind utilities, making it easier to maintain consistent styling.

{{< showcode js "linenos=false" "themes/congo/tailwind.config.js" >}}
customUtilities: {
'.code-title': {
    '@apply inline-block px-3 py-0.5 text-sm rounded-t-lg': {}, // Inline block styling for the title
    'background-color': '#f0f3f3', // Light gray background
    '@apply dark:bg-neutral-700': {}, // Use neutral-700 for dark mode
    '@apply relative top-[3px] left-[1px] z-10': {}, // Increased top offset to touch the code block
},
'.code-block': {
    '@apply rounded-tl-none transition-all duration-300 ease-in-out': {}, // Remove top-left rounded corner, add transition and easing
},
'.code-block-container': {
    '@apply relative mb-1': {}, // Add bottom margin
},
'.expand-toggle-container': {
    '@apply flex justify-start': {}, // Use flexbox for alignment
},
'.expand-toggle': {
    '@apply px-2 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 rounded transition-colors duration-200': {}, // Button styling for the expand/collapse toggle
},
'.not-prose .chroma': {
    'font-weight': '400', // Code blocks use normal font weight
},
'.no-line-numbers': {
    '& td:first-child': {
    '& .chroma .lnt': {
        '@apply pl-0 pr-0 text-transparent select-none': {}, // Removes left and right padding and makes text transparent
    },
    },
},
},
{{< /showcode >}}

1. `code-title` - Creates a tab-like element above code blocks e.g. the `themes/congo/tailwind.config.js` title for the code block above.
2. `code-block` - Removes the rounded top-left corner of code blocks to match with the title and styles the transition for the expand/collapse feature.
3. `code-block-container` - Adds a bottom margin.
4. `expand-toggle-container` and `expand-toggle` - Aligns the expand/collapse button with the code block and styles it.
5. `no-line-numbers` - Allows for the removal of line numbers from code blocks (see below for more details).

## JavaScript

The JavaScript below handles the interactive expand/collapse functionality by:
 - Finding all expand toggles on the page
 - Managing the max-height of code blocks
 - Toggling between "Expand" and "Collapse" text
 - Handling the transition animations

{{< showcode js "linenos=table" "assets/js/custom.js" >}}
document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.expand-toggle');
    toggles.forEach(toggle => {
        const container = toggle.closest('.not-prose');
        const codeBlock = container.querySelector('.code-block');
        const expandText = toggle.querySelector('.expand-text');
        const collapseText = toggle.querySelector('.collapse-text');
        
        // Set initial state
        codeBlock.dataset.collapsed = 'true';
        codeBlock.style.maxHeight = '27rem';

        toggle.addEventListener('click', () => {
            if (codeBlock.dataset.collapsed === 'true') {
                codeBlock.style.maxHeight = codeBlock.scrollHeight + 'px';
                codeBlock.dataset.collapsed = 'false';
            } else {
                codeBlock.style.maxHeight = '27rem';
                codeBlock.dataset.collapsed = 'true';
            }
            
            expandText.classList.toggle('hidden');
            collapseText.classList.toggle('hidden');

            const action = expandText.classList.contains('hidden') ? 'expand' : 'collapse';
        });
    });
});
{{< /showcode>}}

## Hugo Shortcodes

Shortcodes in Hugo are reusable content snippets that you can embed in your Markdown files. They're ideal for dynamic features like embedding videos, generating tables, or adding custom design elements. In addition to the [default Hugo shortcodes](https://gohugo.io/content-management/shortcodes/) and the [Congo shortcodes](https://jpanther.github.io/congo/docs/shortcodes/), you can also create custom shortcodes of your own. Hugo shortcodes are built using [Go templates](https://pkg.go.dev/text/template), which means you can leverage the full power of Go to create any functionality you need.

For example, I created a custom shortcode (`<showcode>`) to display code examples on this blog, which works alongside the Tailwind CSS classes and JavaScript mentioned above.

{{< showcode html "linenos=table" "layouts/shortcodes/showcode.html" >}}
<div class="not-prose">
    {{ $lang := .Get 0 | default "" }}
    {{ $options := .Get 1 | default "" }}
    {{ $title := .Get 2 | default "" }}
    {{ if $title }}
        <p class="code-title text-sm italic">{{ $title }}</p>
    {{ end }}
    {{ $code := trim .Inner "\n\r" }}
    {{ $lines := split $code "\n" }}
    <div class="code-block-container">
        <div class="code-block overflow-hidden" style="max-height: 27rem;">
        {{ $modifiedOptions := replace $options "linenos=false" "linenos=table" }}
        {{ if not (in $options "linenos=table") }}
            <div class="no-line-numbers">
                {{ highlight $code $lang $modifiedOptions }}
            </div>
        {{ else }} 
            {{ highlight $code $lang $options }}
        {{ end }}
        </div>
    </div>
    {{ if gt (len $lines) 20 }}
        <div class="expand-toggle-container">
            <button class="expand-toggle">
                <span class="expand-text">Expand</span>
                <span class="collapse-text hidden">Collapse</span>
            </button>
        </div>
    {{ end }}
</div>
{{< /showcode >}}

1. The shortcode takes three optional parameters in lines 2-4:
    - `lang` - The language of the code block e.g. `go`, `javascript`, `bash` etc.
    - `options` - The options to pass to the `highlight` function e.g. `linenos=table`, `linenos=false`
    - `title` - The title of the code block
2. If a title is provided, lines 5-7 shows it above the code block with styling from the custom `.code-title` class
3. Lines 8-9 retrieves the actual code to be displayed from the shortcode's inner content (`.Inner`), trims any whitespace and then splits it into lines to count them.
4. Line 11 creates a code block with a maximum height of `27rem` (i.e. the height of the collapsed code block). If you are wondering why `overflow-hidden` is not moved to the `.code-block` class in `tailwind.config.js`, it is because inline styles have higher specificity than classes and this stops it from being overridden by the `custom.js` file below.
5. Lines 12-19 conditionally applies the `no-line-numbers` class to the code block depending on the options passed and uses Hugo's `highlight` function to display the code. This allows for line highlighting without line numbers.
6. Lines 22-29 adds an expand/collapse button if the code block has more than 20 lines.

## Partials

Hugo projects use a [template lookup system](https://gohugo.io/templates/lookup-order/) to select the appropriate template for rendering a page. This lookup order allows you to override theme templates by creating your own templates in the `layouts/` folder. For example, to override the main article template in Congo (`themes/congo/layouts/_default/single.html`), you can create your own `layouts/_default/single.html` file.

#### Custom JavaScript Files

To use a custom JavaScript file like the one mentioned above, you'll need to include it in the asset bundle. This can be done through Hugo's partial system: simply copy the `themes/congo/layouts/partials/head.html` file, save it as `layouts/partials/head.html`, and then add the following code somewhere within the `{{/* Title */}}` section.

{{< showcode html "linenos=false" "layouts/partials/head.html" >}}
...
  {{ $customJS := resources.Get "js/custom.js" }}
  {{ if $customJS }}
    {{ $assets.Add "js" (slice $customJS) }}
  {{ end }}
...
{{< /showcode >}}

This ensures that your custom JS file is bundled with other JS files before Hugo minifies and fingerprints it. The final bundle will then be included in the HTML output of your website.

#### Comment Functionality

Since Hugo is a static site generator, it doesn't natively support dynamic features like comments. However, you can integrate third-party services such as [Giscus](https://giscus.app/) to add commenting functionality to your website. Giscus is an open-source, lightweight solution that uses GitHub Discussions to store comments. The only downside is that users need a GitHub account to comment.

To integrate this functionality, visit the Giscus website, configure it, and copy the provided script. Then, add the script to your Hugo project, typically in `layouts/partials/comments.html`. Make sure the `showComments` parameter (or a similar one if using a theme other than Congo) is set to `true`.

Once you've done this, any new blog posts you create will display the comments section below the post.

## Conclusion

In this guide, we've covered several ways to customize a Hugo website:  
- Using Tailwind CSS for flexible and maintainable styling  
- Adding interactive features with JavaScript  
- Creating custom shortcodes for reusable components  
- Leveraging Hugo's partial system to override templates  

These customizations enhance both the visual appeal and user experience of your site. Hugo’s flexibility also opens up many additional possibilities for tailoring your site beyond what we've discussed here.

If you have any questions or would like to share your own customizations, feel free to leave a comment below.


