# Quizzicle

Quizzicle is an app for building quizzes. Or is it? That depends on you.

See the [design files](https://www.figma.com/file/Pb1u7ar3ScfMNt2qBC7Sh1/Site-design?type=design&node-id=16%3A141&mode=design&t=YqkCq87VhzHyipiu-1)
http://localhost:5173/
## Definition of done

The standard of quality will likely be higher for this project than ones you've done in the past. In order for your code to be merged:
- errors should be well handled and presented to the end-user in a helpful (but sanitized) way
- no sensitive data should be exposed on the client side
- it should pass npm run lint without any code-related warnings or errors
- no unnecessary comments or log messages should remain
- it should use Types where applicable, and any Type issues should be resolved
- features should be tested at every level of the stack that they touch (both "happy" and "sad" scenarios should be tested)
- user-facing updates should be checked for accessibility concerns

## Setup

### Installation and migrations

- Clone this repo and `cd` into the new directory
- Install packages and start the dev server with `npm run dev`
- Visit [http://localhost:5173](http://localhost:5173) in your browser

---

### Getting familiar with the app

This project uses jwt-authorization-query as a template, so you'll see:
- Authorization stubbed in
- Styled components
- Full-stack file structure

Additionally, you are already provided with:
- Migrations and seeds for the initial tables (don't worry, there will be more to do)
- Placeholder components

---

