# Dynamic Data

Currently your web site is static. The information is fixed and cannot change. Web sites can also be dynamic with data that changes over time. For example what new public spaces could be added to the site the new spaces would show up on the list. Or what if you could search for a public space by name or address and the list showed only results that matched your search.

To handle these situations you'll need store the data that we see on the screen outside of components themselves.

You'll need a data structure to hold this data. A common option is JSON. **JSON or JavaScript Object Notation is a plain text format that translates to standard JavaScript Objects and Arrays.**

## Take a look at the JSON file

It looks a lot like a JS array of Objects. If you look at the top level of the array it looks like this:

`[{ ... }, { ... }, ...]`

At the top level you have an array, and each element of the array is an object.

Take a look at the first object:

```JSON
[
  {
     "title":"Transamerica Redwood Park",
     "desc":"Located in the shadow of the Transamerica Pyramid, Redwood Park is one of the Financial District's greenest and most serene spots. Here, towering redwoods surround a half acre of statues and a large central water feature. Plus, the park is often empty, which means there's almost always a bench available for the hogging. Potential visitors take note: The park is closed every evening",
     "address":"600 Montgomery St San Francisco, CA",
     "geo":{
        "lat":37.7952005,
        "lon":-122.4027927
     },
     "images":[
        "transamerica-redwood-park.jpg"
     ],
     "website":"https://pyramidcenter.com/point-of-interest/redwood-park/",
     "features":[
        "outdoors",
        "coffee"
     ]
  },
  ...
]
```

This first element has the same properties as the others. The information here describes a location. Some of the values are strings, some are numbers, others are objects and arrays.

### Challenge!

Identify which values are strings, which are numbers, which are objects, and arrays in the `JSON` above.

### Continue!

Here is a a breakdown of what is in each of these objects.

- title - `String` - A short name/description
- desc - `String` - A long detailed description
- hours - `String` - A string showing the hours
- address - `String` - The written address
- geo - `Object`
  - lat - `Number` - The geocoordinate latitude
  - lon - `Number` - The geocoordinate longitude
- images - `Array` - A list of file name strings
  - `String`
- website - `String` - A url string
- features - `Array` - A list of strings describing features of the location
  - `String`

Each object has the same properties though the values will be different for each.

## Importing JSON

You can import JSON from a file if you are using the the create react app starter code. Just import it at the top of a file like this:

`import data from './my-data.json'`

From here you could get at any of the elements using standard JS syntax. For example:

```JS
data[0].title       // Transamerica Redwood Park
data[1].title       // Empire Park
data[2].geo.lat     // 37.79408
data[1].features[1] // art
```

## Using JSON

You can use the JSON object to generate `POPOSSpace` components. Originally you created a list of these manually. We could say you "hard coded" all of the values to create static elements. In this step you will use JSON data to create dynamic elements.

The easiest way to do this is with `Array.map()`. `Map` is used to transform an array. Use it when you have an array of one kind type that you'd like to transform into another type.

The first step is to load the JSON data in your `POPOSList` component.

Download this [sfpopos-data.json file](https://drive.google.com/file/d/1MlCiboVPXyNP-KJpqK6EtZcJUV4Rb5yP/view?usp=sharing) and put it in your `src` directory

Now let's test out printing the JSON to console:

Add the Following at the top of `POPOSList.js`

```js
import data from './sfpopos-data.json'
```

Use the console to practice with `Array.map()`.

Add the code here to `POPOSList.js`, after the `POPOSList` function:

```JS
const titles = data.map((obj) => {
  return obj.title
})
>
console.log(titles)
```

Go to your browser and inspect the page. Then check the console. You should see an array of all of the titles from the data array:

`["Transamerica Redwood Park", "Empire Park", ... ]`

What happened here? You called the `map()` method on the `data` array, `map()` returned an array of strings.

How does it work? The `map()` method takes a callback function and calls this once for each item in the array. Your callback function gets one of the things from the original array and should return something to be included in the output array. In this example the callback function returned the `title` from each `obj` in the original array.

You started with an array of Objects and map output an array Strings. This is what map is used for. Converting an array one type into an array of something else.

Here is another experiment. Try this:

```JS
const titles = data.map((obj) => {
  return <h1>{obj.title}</h1>
})
```

This time you made an array of Components (blocks of JSX). The text inside each `<h1>` is the title string.

In the `src/POPOSList.js` component make this change:

```JS
...

import data from './sfpopos-data.json'

const titles = data.map((obj) => {
  return <h1>{obj.title}</h1>
})

function POPOSList() {
  return (
    <div className="POPOSList">
      { titles }
    </div>
  )
}
```

Here you put an array of JSX/Components inside a block of JSX code. When React sees this it will automatically display all elements in the Array. You should now see the titles of each place in your page.

**Your goal here is to turn the array of objects into an array of components.**

Remove the code from the last example, **but be sure to keep the the line that imports the JSON data:**

```js
import data from './sfpopos-data.json'
```

Edit `src/POPOSList.js` to look like this:

```js
// src/POPOSList.js

import React from 'react';
import POPOSSpace from './POPOSSpace';
import './POPOSList.css';
import data from './sfpopos-data.json'

function POPOSList() {

  const spaces = data.map((obj) => {
    return (
      <POPOSSpace
        name={obj.title}
        address={obj.address}
        image={obj.images[0]}
      />
    )
  })

  return (
    <div className="POPOSList">
      { spaces }
    </div>
  )
}

export default POPOSList
```

Now you should see one `POPOSSpace` for each object in the data array.

# Deconstructing properties

Objects and arrays are essential tools you will use a often. However, they can complicate your syntax which can lead to errors.

We can refactor this code to make it easier to read and less prone to error. Let's look at this snippet from `POPOSList.js`:

```JS
const spaces = data.map((obj) => {
  return (
    <POPOSSpace
      name={obj.title}
      address={obj.address}
      image={obj.images[0]}
    />
  )
})
```

Notice you had to write `obj.` in three places. Consider this:

```JS
const spaces = data.map((obj) => {
  // Make a variable for each property
  const title = obj.title
  const address = obj.address
  const images = obj.images

  return (
    <POPOSSpace
      name={title} // no need for obj. here
      address={address}
      image={images[0]}
    />
  )
})
```

This is a small improvement. Here you have made three intermediate variables to hold the values from properties on `obj`. The downside is you had to add three new lines of code.

Deconstruction allows what the previous example does in a single line of code.

```JS
const spaces = data.map((obj) => {
  // Deconstruct obj into properties
  const { title, address, images } = obj

  return (
    <POPOSSpace
      name={title}
      address={address}
      image={images[0]}
    />
  )
})
```

Now your code is short and concise. As an option you can even use deconstruct as a parameter.

```js
const spaces = data.map(( { title, address, images } ) => {
  return (
    <POPOSSpace
      name={title}
      address={address}
      image={images[0]}
    />
  )
})
```

This example deconstructs the object on the parameter to the callback.

Update your code with this deconstruction in `/src/POPOSList.js`

## Keys and Lists

After you have the list displaying in your browser open the console. You should see a warning that read something like:

`Warning: Each child in a list should have a unique "key" prop.`

This is specific to React and it's Virtual DOM. The virtual DOM is used to manage your components and the browser's DOM.

For the Virtual DOM to be efficient, it needs to know which items have been changed. In the case of a list, it does not know which items in the list have been changed, unless each item has something to identify it uniquely.

Use the key prop for this. A key can be *any* value as long it is *unique for each element in a list*.

The `title` is unique to each element in the list making it a good choice for a key. 

```js
const spaces = data.map(( { title, address, images } ) => {
  return (
    <POPOSSpace
      key={title} // The title could be a key
      name={title}
      address={address}
      image={images[0]}
    />
  )
})
```

You can use the title for a key since all of the locations have a different title.

Add `key={title}` to the `POPOSSpace` in `src/POPOSList.js`

# Adding Times

The new data has lots of extra information.

The goal here is to display the hours for each location. You will need to modify the `POPOSSpace` to display the hours and then modify the `POPOSList` component to pass the hours from the data as a prop.

Start in `POPOSList.js`. Get the hours property from your data.

You need to pass the hours to a prop when you make the list of `<POPOSSpaces>` components using map. Roughly, it might look something like:

`<POPOSSpace ... hours={hours} />`

Then you will need to edit `POPOSSpace.js` and create a new element in the component that will display the hours passed as a prop.

Follow the guidance above to complete the challenge! Do your best, and try to work through it before viewing the solution below.

<details>
<summary>Solution</summary>
<br>

In `POPOSList.js` look for the section that maps your data to an array of Spaces. Add an `hours` property there:

```js
// deconstruct hours here
const spaces = data.map(({ title, address, images, hours }) => {

  return (
    <POPOSSpace
      key={title}
      name={title}
      address={address}
      image={images[0]}
      hours={hours} // add a new prop for hours here
    />
  )
})
```

In `POPOSSpace.js` get the hours and display them. We also moved the name to be above the image

```js
function POPOSSpace(props) {
  // Get the
  const { name, image, address, hours } = props
  return (
    <div className="POPOSSpace">
      <h1>{name}</h1>
      <img src={`${process.env.PUBLIC_URL}images/${image}`} width="300" height="300" alt="Hello" />
      <div>{address}</div>
      <div>{hours}</div>
    </div>
  )
}
```

</details>

## Stretch Challenge

Add some custom styles to the hours! Maybe make it italic, or use a different font or font size!

# Now Commit

```bash
$ git add .
$ git commit -m 'dynamic content and footer'
$ git push
```

# Next

Click [here](../P05-Adding-React-Router/) to move onto the next section about adding a react router.
