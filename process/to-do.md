# Okay now we need actual to dos

## Title
- Guess it needs a title screen? What would that look like?

## Space
- ~~Consider going through and remembering departure x,y from a scene and reusing on entry IF it's relevant for that kind of transition? Wouldn't be all that hard to do tbh. And would be more naturalistic etc. Would then need the queue to be able to look up or down, chiefly, but that ain't hard at all.~~

## Dialogs
- ~~Add painting information dialogs~~
- ~~Instructions for looking down and up~~
- ~~Ticket person~~
- ~~Entry guard~~
- Queue members on collide (e.g. excited direct comment)
- Queue members as you move pass them in the space (e.g. excited whispering) (Needs to acknowledge the the dialog could already be in use and not trigger) (maybe have an actual overlap that deletes itself, just a series of them as you pass along, could even have one per queue member randomly or something so that they could turn and look? Would be quite satisfying) (should have a "faceDown()" option for People so they can turn in different directions and idle, not just just stop)
- Queue guards
- Double check all required places have dialog

## Queue behavior
- ~~Create a function to send the front person in the queue to go sit in the chair and the rest of the queue to move up. Add a new person to the (invisible) end of the queue so it doesn't end (is this cheating?)~~
- ~~Fix depth issues around the chair~~
- ~~Trigger first sitter when marina looks up~~
- ~~Calculate timer for duration of sitting (use the original game)~~
- ~~On timer end have them stand and walk away (just stage right is fine)~~
- ~~Show message telling marina any key to look down again~~
- ~~Make it impossible to move above the queue by just having the person at the back keep talking to Marina if you try, an invisible wall kind of situation OR just make them face up~~
- ~~Fix the facing if marina's "above" the queue~~

## First person view
- ~~Trigger an overlay when looking at someone so you can stay in the same scene~~
- ~~__IT'S GOOD__ Consider random weeping (prototype it)~~
- ~~Improve weeping~~
- ~~Consider blinking (replace eye area with their skin color, which I suppose we have access to somewhere in there? Or can.)~~

## Timing
- Infinite timing issues
- End of day timer, so that there's a moment where the museum closes and "kicks you out", but just an ending screen that asks you to come back (maybe, likewise, a dialog that comes up to tell you when it's 15 minutes to go or something)


# Generalllllll

- ~~Collect images from the documentary of relevant spaces~~
- ~~Start an actual Phaser project (let's not bother with mobile? Or very lightly contemplate click-based interaction I suppose)~~
- ~~Import a walk cycle~~
- ~~Contemplate using a sprite atlas instead of the current madness?~~
- ~~Build a "simple" walking around scene~~
- ~~Add an object collision with hitboxes etc.~~
- ~~Contemplate sprite recolouring issue~~
- ~~Contemplate how to do room-shape collisions~~
- ~~Build a dialog box object/function (guess it could just extend sprite)~~

# Bugs

- Can get caught against car on arrival at MoMA, probably because it's going over the input disabled line. Do I even need that stupid line?
