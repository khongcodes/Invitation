Because of proxy setting in package.json:
all fetch calls are automatically prepended with
'http://localhost:3001/api/'


According to the JWT Documentation: Whenever the user wants to access a protected route or resource, the user agent (browser in our case) should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:

Authorization: Bearer <token>

The corresponding fetch request might look like this:
```
fetch('http://localhost:3000/api/v1/profile', {
  method: 'GET',
  headers: {
    Authorization: `Bearer <token>`
  }
})
```

