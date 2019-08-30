# Getting there, Sitting there, What is it about? (Wednesday, 21 August 2019, 14:44PM)

Okay then. I thought I would make a sequel to The Artist Is Present (the game) now, about nine years after I released the first one. Arguable the game that "made my name" or something along those lines. Still a game a bunch of people identify me with, having no conception that I made anything worthwhile after it. Ho ho.

The premise is simple. It's "the same game" but you're Marina instead of an audience member.

There are a bunch of decisions to be made chiefly around what it means to get to the performance, and then what the interface is like when you're in the performance.

## Getting there

I can think of a few gradations of detail here.

### You could just already be in the room right at the start of the game.

This wouldn't work at all though because it gives you no chance to embody your character as Marina, so it would just be disorienting and unclear.

### You could arrive at the museum just like an audience member (except earlier I suppose). Go in through the doors, say good morning to the people there, and then walk down the same hallways to get to your chair and sit down.

I like this one for mirroring the original game and lending a different feeling to the same actions that existed in that game. I guess I don't know how much I want to be referential to the original versus being authentic to the actual process by which Marina went to the performance? How authentic is this thing to be and in what ways?

In this version and any that don't have a changing room you'd already be in the red dress presumably, which I think would be nice and lend some humour to the experience.

### You could start at home and come to the museum from there (perhaps then cutting to the ideas in the previous one, so still coming the front doors etc.)

This was part of my vision for it when I was thinking of it a few days ago. In particular I wanted a kind of tribute to [Every Day the Same Dream](http://www.molleindustria.org/everydaythesamedream/everydaythesamedream.html). Start in the bedroom, go to the living room/kitchen, to the hallway with elevator (or stairs?), down to the street, into a car, arrive at MoMA, and carry on.

### I guess there's an ultra authentic version where I look at the footage available and try to actually recreate her path to MoMA and inside it, too

Which can work, too, but may not even be that rewarding. The authenticity isn't really meant to operate at the level of the architecture? Though I could certainly reference the actual apartment she was in (maybe a joke including passing through multiple living areas?) The ultra-authentic version would presumably involve dressing at the museum but I think it's too fun for her to dress at home.

### So something like

- Use reference images for EDTSD style sequence (in Sierra style art).
- Starts at home in bedroom.
- Maybe just by exiting she ends up in clothes. Otherwise by "using" the closet, but this raises the possibility of going naked, which is something else.
- Into living area. Maybe more than one.
- Kitchen area.
- Exit to hallway.
- Use elevator (if more referencing EDTSD), use stairs (if more referencing the actual apartment - also the hilarity of Sierra stairs).
- Street. Car waiting for her.
- Car takes her to MoMA. (Maybe a cut scene of being in the car for a set amount of time?)
- And from there follow the standard sequence. When you sit the queue forms? Or is it already there?

So yeah, question: is the queue already waiting and you arrive and sit and it begins, or there's no one, you sit, and then they come. There's something funnily vulnerable about there being nobody initially?

Also do I want to engage with questions of time this time? Or is it on "Marina time" so that when you get there, that's when it begins? I think I might prefer that?

## Sitting there

Until in the original game where sitting was the big reveal, here it's the majority of the experience I guess?

My thought is that it should simply bring up a blown up face of the person who sat down (literally scale it up) and that's it. They sit for however long they "want" to (match the timings of the original). THen they get up (maybe a nice tween) and you cut back to the main view and wait for the next one (head down). Maybe you choose when to raise your head actually, that would be nice. Will have to look at how I might include instructions for that kind of thing. (And actually if I do include an "action button" I could consider the wardrobe thing again - perhaps just not letting nude Marina leave since it's "not that kind of performance").

Honestly that bit doesn't sound all that incredibly difficult.

## So

There's a fair bit to think about clearly, and some new environments to create. I need to get Sierra-style-stuff working in Phaser3 (shouldn't be too bad given Eveline was in Phaser 2 I think).

Some open questions about authenticity of time and space.

Questions about interaction buttons and wardrobes.

## What is it about?

The key factor here is the question of what the game is "about", and I think it's about the experience of being Marina right? To which end I need to make decisions that focus on that. As such I don't think the time thing is at issue - we don't need to deal with concepts of her being "late" or whatever. It just starts when she sits. And lasts for however long it was meant to last (8 hours?).

The key is for the player to at some level build some identification with Marina as a brave/determined/lonely/independent figure (this being achieved through the sequence of arrival, which is probably why the apartment is so important). And then to identify with the act of endurance as almost secondary somehow, a matter of course, something you just do? Unsure what I mean by that, but it seems to me right now that the most important thing is settling into her role and then carrying it out to the best of your abilities?

More thought as it develops I suppose.

---

# The dress, queue chat, fatigue and the semester (Friday, 30 August 2019, 14:38PM)

## The dress

I've made some light progress on actually putting the game together. I now have a Marina-in-a-dress walking around in the atrium and it looks surprisingly good (if I may say so myself). The moment where I had her walking and it _felt_ like the dress was a good moment, it was one of those "maybe this whole game will work" things, so that was nice.

## Queue chat?

I'm realising as I type this that I've decided she's going to enter the museum the "normal" way? In which case she'll pass the queue as she goes down the hall. This gives an opportunity for them to turn and look at her and say things. And perhaps if you bump into them they can say generated fandom things to you, so there's a kind of actual feeling of the crowd there waiting to see you. That will add a bit of liveliness to the experience?

## Fatigue and the semester

I'm pretty aware I haven't been all that devoted to this project given that the new semester is starting and my time will start to seem smaller and bitsy for a while. Which is fine! But I'm signaling to myself not to freak out about productivity. I'll get stuff done on it over time and we'll get there. Ebbs and flows, my friend.

---

# Planning the scenes (Friday, 30 August 2019, 15:15PM)

Let's plan this thing scene by scene...

- __Bedroom__. At the start you're in bed, you can see that you're already wearing the dress (but maybe under the covers?). A message welcome you to the game and when you continue you pop out of the bed. (In EDTSD you start standing beside you bed with the alarm on.) I like this because although Marina is famous for doing naked things, it's not relevant here and Sierra-style avatars are _not_ good for depicting naked bodies and _especially_ not naked female bodies. I don't want to even try to go there. So she sleeps in her dress. It's kind of comical, maybe a little endearing? Wrong, obviously, too, but we're going for a spirit not exact matches with reality. So you're up and you can walk to the right to leave the bedroom. No interactive furniture or anything (and indeed ideally I think no interactions of any kind beyond triggering things through movement and dismissing dialogs with keys).

- __Lounge, Kitchen, Door__. There's a chance to have some fun depicting some of the weird contemporary furniture in the apartment she stayed in? I like the idea of drawing some representations of that space, there's something about it that's kind of sad and cold and depressing and I think her walking through it at some small length would be quite satisfying. The kitchen, too, is relatively iconic from the documentary with its green shelving in the back. Nothing to do here except walk all the way through of course. Can have a slanty wall with the exit door on it...

- __Stairs? Elevator?__. The real apartment has stairs and it would be kind of nice to stick with that, but it would require a special spritesheet? Or would it be plausible to do just dropping the existing sprite downward while moving forward? There's something nice about going down stairs in these games, it's quite satisfying? On the other hand, an elevator is what is in EDTSD and it's "easier" in some sense to implement? The doors could just open when you walk into the hall and close when you go in? Maybe an indicator changes from floor to floor? At the bottom you're in another hall which you leave to go outside? Got to think at least a little about the spatial correspondences? But some of this will be aided, I think, by splitting most of the spaces into separate scenes perhaps? (What about the museum?) Oddly this stairs/elevator issue is a challenge.

- __Car pickup__. After leaving the apartment you should end up on a street corner (with the building visible behind you?). A car pulls up and maybe they say your name or whatever, and you approach the car and automatically get in.

- __Car driving?__. Do we want any kind of interstitial of sitting in the car with the city rolling by? It would potentially be kind of meditative and nice, but might be weird to lose agency like that? There's a precedent in games like LSL though. Those tend to have a front-facing view (and kind of weirdly detailed?), whereas here I like the idea of just our face framed by a window with buildings going by?

- __MoMA__. From this point you're into the previous game's scenes, being dropped off in front of MoMA. So you go in, could say hi to ticket perhaps, to security guard. Then walk the halls, see the queue. The people talk about you or to you if you approach. You go all the way to the front (you can trangress the lines I suppose?). Security guard tells you some information about sitting down to start the day. You go near your chair and automatically sit, and then there are announcements from the guard, and people start coming to sit with you. For this I'll need to remember the queue of people or at least their spritesheets to generate the correct queue order for when you sit, but that could be as simple as generating the correct sprite keys into an array and rebuilding them in subsequent scenes as needed. Or maintaining the idea of the first game where MoMA is a single scene, that's fine too. Will still need at least some queue management stuff so that everyone moves up properly and so on, could be hell. Could be fine. I can do it.

- __Gazing__. You have your head down when the person sits (automatic or chosen?) and then once they sit you can choose the moment to look up (maybe with the up arrow, and the down to look down, which could signal you're ready). On looking up we fill the screen with just their (very zoomed in) pixel face. No blinking. You look they look, eventually they leave (raise the sprite a bit then cut to the room). Same process of looking down (maybe you choose), next person comes, you look up. On we go. Until the day is done, and then.... what? Should there be a reversal where you go home to bed? Funny? Or stupid? Maybe stupid. Maybe the museum closes and the game fades to black.
