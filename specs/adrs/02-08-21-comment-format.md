# Code Documentation

* Status: accepted
* Deciders: Team-wide (original team as of 2/8/21)
* Date: 2021-02-08 

## Context and Problem Statement

We want to document our code to improve readability.  How should this be done?

## Considered Options  
* Full in-depth CSE 12 method header, with all variables, return, method name, etc.  
* In-line Commenting  
* Compromise of both: 
Includes: Method header with Description, Input, Output, and Result as well as inline comments of crucial lines.

## Decision Outcome

Chosen option: "Option 3, a compromise", because we believe that the CSE12 header has some unnecesary components such as method name and that just in-line commenting would be too brief.  A compromise of the two leads to a good middle ground.

### Positive Consequences

* By making this decision we have a more concrete idea of code organization.  This will improve readability and let our reviewers know where to expect their information.

## Pros and Cons of the Options 
* A majority came to a consensus that option 3 was simply the best of both worlds.