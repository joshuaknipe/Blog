---
title: "Why I Built This Blog with Hugo"
date: 2024-11-24T09:29:49+01:00
topics: ["updates", "hugo", "web development"]
---

{{< lead >}}
**"Why build your own blog when platforms like Medium exist? Seems like a lot of unnecessary effort."** Quite possibly! My motivations for building my own website, and why I chose *Hugo* to do it.
{{< /lead >}}

I could have easily used a platform like Medium, Substack or even LinkedIn if I just wanted to put ideas out there, but building my own blog gave me something more. It wasn't just about writing—it was about control, customisation, and learning new skills.

## Why Build Your Own Website?

In the age of social media and content-sharing platforms, creating a personal blog might seem unnecessary. Services like Medium offer easy-to-use interfaces, built-in audiences, and zero hosting hassles. However, while these platforms can be convenient, they come with limitations that make owning your blog a better investment in the long run.
- **Design**: Posts follow a standardised format on these platforms. This limits how you can express your ideas visually and structurally. Building your own website means you can customise the look, feel and interactivity in whatever way you want. Case in point: I can't have code blocks with expandable sections or highlighted lines on those platforms, but I was able to build that into this website! See for yourself in my [previous post](/blog/obsidian-periodic-notes/).
- **Technical Skills:** Creating and maintaining a blog—or any website—teaches valuable technical skills. I've had to get my hands dirty with HTML, TailwindCSS, JavaScript and Go to get things working exactly the way I wanted to.
- **Content Ownership**: On your own blog, you’re the sole owner of your content. No one can change terms, increase pricing, delete posts, or limit visibility without your consent.
- **Future proofing your work:** Trends in platforms and social media come and go. When you have your own blog, you aren’t tied to the lifespan of a third-party service. Your blog will stand the test of time, evolving as you do.

## Choosing Between Static and Dynamic Sites

When deciding to build a personal blog, one of the first questions to tackle is: *Which website framework should I use?*  The web development landscape has an endless list of options to choose from, each with its own pros and cons. For this website, I chose [**Hugo**](https://gohugo.io/), a static site generator that uses Go under the hood. 

Some background: *A static site generator* (SSG) is a tool that converts content (often written in Markdown or another lightweight format) and templates into static HTML, CSS, and JavaScript files that can be served directly by a web server. Unlike traditional dynamic websites that generate pages on the fly using server-side code, static sites deliver pre-built pages to the user. Think of it this way: a static site is like a pre-recorded TV show (everything is prepared in advance), while a dynamic site is like a live broadcast (content is generated on-the-fly based on user requests).

### Advantages of Static Site Generators
1. **Speed**: No server-side processing — files are pre-rendered and directly served to users, resulting in faster load times.
2. **Security**: Static sites load quickly and don’t rely on server-side processing, making them inherently secure. There’s no need to worry about server vulnerabilities or database hacks.
3. **Cost-Effective**:  Can be hosted on inexpensive or free platforms that support static files, like Cloudflare Pages, GitHub Pages or Vercel. This flexibility saves on hosting costs and simplifies deployment.

### Limitations of Static Site Generators
1. **Dynamic Content**: Not ideal for applications needing frequent content updates, user authentication, or real-time interactions (e.g., e-commerce or social media).
2. **Build Times**: As the number of pages grows, build times can increase, especially for large sites.
3. **Third-Party Dependencies**: Features like forms, comments, or search often require third-party services

Static Site Generators are not ideal in all scenarios, but work well for any project where dynamic content is not essential, like portfolios, documentation sites (or blogs!).

## Evaluating the Alternatives

| Framework | Pros | Cons | Best For |
|-----------|------|------|-----------|
| WordPress | Easy UI, Rich plugins | Slow, Requires backend | Content-heavy sites |
| Next.js   | Highly dynamic, Modern | Overkill for static, Complex setup | Web applications |
| Jekyll    | GitHub integration, Simple | Slower builds | Simple blogs |
| Hugo      | Lightning fast, Highly customisable | Steeper learning curve | Static sites, Blogs |

### WordPress
Some estimates suggest that 30% of the web runs on WordPress. It's not a SSG, but I thought it worth including here since it's so ubiquitous. Its extreme popularity is often attributed to how easy it makes setting up websites for non-technical users, given its intuitive UI, rich plugin ecosystem, and wide community support. Unfortunately, it also has a reputation for being slow and bloated. This, combined with the fact that it requires hosting with a backend (e.g., PHP, MySQL), meant it was a no-go for me.

### Next.js
Next.js is a React-based framework that has been exploding in popularity over the last few years. It allows you to build highly dynamic features and is great for sites or applications needing dynamic content, personalised user experiences or a lot of client-side interactivity. Unfortunately, the build times are slower because it bundles JavaScript and processes React components. You could technically use it as a SSG by using `next export`, but that feels a bit like hiring an architect to design a garden shed. If you do want the highly dynamic content, that requires hosting with a backend that has a Node.js runtime. Overall, a bit overkill for a static blog, but my choice for regular web apps!

### Jekyll
Jekyll is a static site generator that uses Ruby in the background. Its main selling point is its native integration with GitHub Pages, meaning you get a simple set up, markdown-based content management and free hosting. Its templating syntax is beginner friendly and the configuration required out the box is very minimal. Its performance is good, but not quite on par with Hugo. If a friend wanted to spend less time setting up their blog before putting things out there, this is probably the option I would recommend!

### Hugo
In addition to the standard SSG advantages listed above, Hugo shines in the following ways:
#### 1. Speed and Simplicity
Hugo’s primary claim to fame is its blazing-fast build times. Written in Go, it is optimised for generating sites with many pages and compiles even large websites in seconds. Compared to Jekyll, Hugo's build times are significantly faster, which was crucial for a site that might grow in the future
#### 2. Markdown-Driven Workflow
Hugo makes it incredibly easy to write content in Markdown, which is a format I already enjoy using for its readability and simplicity (and one that any Obsidian user will be very familiar with). Rich content like images, videos and code snippets are also easy to include through Hugo's 'shortcode' system.
#### 3. Folder-Based Structure
Hugo’s folder-based structure organises content, layouts, and assets in a logical way, mirroring the final site structure. Content, like blog posts, is stored in directories such as `content/blog`, while static files reside in `static`. This setup makes file management straightforward, even for large projects, and features like archetypes (pre-defined content templates) and bundles (grouping similar content into folders) help maintain consistency and organisation.
#### 4. Templating System
Hugo’s templating system, powered by Go templates, enables highly customizable layouts. It supports reusable components like headers and footers and provides built-in functions for tasks like formatting dates or processing images. With flexible layouts for pages or sections, Hugo’s templates offer simplicity while allowing for complex designs without external tools.

The main trade-off with Hugo is its learning curve, particularly when it comes to customization. If you're not familiar with Go, the templating system can feel daunting at first — while not as complex as React or Next.js, it's notably more sophisticated than Jekyll's approach. Fortunately, Hugo boasts an active community and comprehensive documentation that make the learning process much smoother. Plus, once your site is up and running, publishing new content is as easy as adding new markdown files!

## Conclusion

If you're thinking about creating a personal blog or portfolio, I highly recommend giving Hugo a try. The process is easier than it seems, and the rewards—both in terms of speed and control—are worth it.

In my next post, I'll detail how I set up this blog, customised it to my liking, and deployed it for free on Cloudflare Pages.