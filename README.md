# Ajax

This is the repo for [Udacity's Ajax course](). The course covers making asynchronous requests using three different methods:

* the XHR object
* jQuery's `.ajax()` method
* the Fetch API

The same project is built with each of these techniques. You'll find one folder for each.

## Table of Contents

* [Instructions](#instructions)
* [Creator](#creators)

## Instructions

There are no special instructions for this project.

## Creators

**Richard Kalehoff**

* [https://twitter.com/richardkalehoff](https://twitter.com/richardkalehoff)
* [https://github.com/richardkalehoff](https://github.com/richardkalehoff)

## Student

**Jahun Seo**

* [wkgjs0809@gmail.com](wkgjs0809@gmail.com)

## Student's Note

### [XMLHttpRequest.open()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)

```sh
$ XMLHttpRequest.open(method, url)
$ XMLHttpRequest.open(method, url, async)
$ XMLHttpRequest.open(method, url, async, user)
$ XMLHttpRequest.open(method, url, async, user, password)
```

Passing false as the third option makes the XHR request become a synchronous one. This will cause the JavaScript engine to pause and wait until the request is returned before continuing - this "pause and wait" is also called **"blocking"**. This is a terrible idea and completely defeats the purpose for having an asynchronous behavior. Make sure you never set your XHR objects this way! Instead, either pass true as the 3rd argument or leave it blank (which makes it default to true).'