# Requirements
- Windows OS (10 recommended)
- Node v10.23.0 with windows-build-tools installed [1]
- [Dolphin 5.0-12716](https://dolphin-emu.org/download/dev/31524288e3b2450eaefff8202c6d26c4ba3f7333/)
- [VBA-M nightly (Nov 11, 11:01 PM)](https://win.vba-m.com/nightly/visualboyadvance-m-Win-64bit.zip)
- [OBS Studio](https://obsproject.com/)
- A copy of Legend of Zelda: Four Swords Adventures for the Nintendo Gamecube
- A copy of the Gameboy Advance BIOS

# Configuration

## Dolphin

### Installation
Install Dolphin normally using the standard installer. At the time of this project's writing, [Dolphin 5.0-12716](https://dolphin-emu.org/download/dev/31524288e3b2450eaefff8202c6d26c4ba3f7333/) was used.

### Configuration

Dolphin configuration is minimal.  

#### 1) Audio  

Set Audio DSP Emulation Engine to `DSP LLE recompiler`   

![Sound settings](documentation/dolphin_sound.png?raw=true "Audio")  

If this is left on `DSP HLE emulation (fast)`, whenever the VBA-M emulators are started, audio cuts out on Dolphin.  

#### 2) Controllers  

![Controller settings](documentation/dolphin_controllers.png?raw=true "Controllers")  

Set all controllers to GBA.  

If prompted for network access, allow.


#### 3) Launch game

Navigate to your stored copy of The Legend of Zelda: Four Swords Adventures and open it. 


## VBA-M

NOTE: You will need to run four instances of this emulator, each with its own configuration file. VBA-M will read from the local config ini in its working directory if one exists. Four pre-defined files have been provided for you in this working directory.


### Installation
You will need to download the nightly build of VBA-M at the time of this writing. The stable release does not allow for background input and will not allow simultaneous running of the emulators. At the time of this writing, the nightly used is [VBA-M nightly (Nov 11, 11:01 PM)](https://win.vba-m.com/nightly/visualboyadvance-m-Win-64bit.zip)

Once downnloaded, navigate to the gba/ directory in this repository. Copy and paste the .exe into *all four* directories.


### Configuration


#### 1) Set the Boot ROM

For each VBA-M, you navigate to Options -> Gameboy Advance -> Configure. From here, you will have an option to set a path to your GBA BIOS file. Find your GBA BIOS file and set it accordingly in each VBA-M instance.  

It is okay to target the same GBA BIOS bin with all four instances.  

![BIOS 1](documentation/gba_bios_options.png?raw=true "BIOS 1")  
![BIOS 2](documentation/gba_bios_options.png?raw=true "BIOS 2")  

#### 2) Launch your instances in order

It is incredibly important to launch your VBA instances in order. This is because each instance has a controller mapping to its respective player (1-4) Performing this out of order will make key binds unreliable.

Start by going into the player_1 directory, launching VBA-M if you have not already, and going to File -> Open -> [Path to your BIOS file]

This will open the GBA BIOS. You should see the normal startup screen, with a quick jingle and green colored text.

If your VBA-M freezes on this screen, you will need to re-launch the GBA BIOS. Otherwise, if you see the below image "LOOK AT YOUR TV SCREEN!" with green text, you are successful.


![Player 1](documentation/gba_green.png?raw=true "Player 1") 

Once you screen this screen, you are okay to launch the next emulator. Repeat the above steps with players 2-4. Below are the expected correspondences. 

player_2 -> Red  
player_3 -> Blue  
player_4 -> Purple  


## OBS

### Installation
Install normally through the installer from [OBS Studio](https://obsproject.com/). 

### Configuration

#### Sign into Twitch.TV

Sign into twitch TV with your credentials. OBS streamlines this with a window to authenticate. Simply sign in.


#### 1) Create a new Scene

Create a new Scene. In OBS, this is a configuration template that you can refer to in the future.


#### 2) Add a Source -- Dolphin

Add a new source. In this case, you will want to target the active window for the Legend of Zelda: Four Swords Adventures


#### 3) Add a Source -- VBA-M

Adding VBA-M sources gets a bit trickier. OBS has a difficult time differentiating between all the active VBA-M instances.  

Each VBA-M instance will want it's own source. So you will repeat this four times, naming each VBA-M with it's respective window (Green, Red, Blue, Purple)  

Each time you add a VBA-M instance, click on the VBA-M emulator you wish to add to make it the most recent and top of the list in OBS sources. This will help you differentiate it from the other VBA-M currently running instances.  

![OBS Configuration](documentation/obs.png?raw=true "OBS") 

NOTE: If you close OBS or leave this scene, it will be necessary to go through and reset each VBA-M instance to it's corresponding player. OBS scenes do not have the ability to retain which color they correspond to, and when loading from Scene, will all default to the same window instance.


## NodeJS

### Installation

For installing Windows Build tools, the following method outlined [here](https://www.npmjs.com/package/windows-build-tools) appeared to actually be problematic. It was found that the best way to install this was to actually first install [Node 14.15.1](https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi) via the MSI windows installer and select the optiona lbuild tools prompt. Once v14.15.1 was installed, [nvm-windows](https://github.com/coreybutler/nvm-windows) was installed over the top to manage node versions and target Node v10.12.0 for this project.


### Configuration

#### 1) .env file

Copy the .env.sample to .env 

Fill out the TWITCH_BOT_USERNAME, TWITCH_BOT_TOKEN, AND TWITCH_BOT_CHANNEL with the corresponding Twitch TV username, token, and channel. More information can be found at https://dev.twitch.tv/docs/api/  

It is also possible to use Discord in this application. For this, you will want to fill out DISCORD_BOT_NAME and DISCORD_BOT_TOKEN. Ensure your Discord bot is invited to any servers that you wish it to monitor. More information on this can be found at https://github.com/discord/discord-api-docs


#### 2) Installing node dependencies

Open up a terminal in this project's working directory. Run the command `npm ci`. 

If you receive any errors, please review the Installation sub section above. Common errors are likely:
- You are running the wrong Node version (You can verify this with `node -v`). Supported version is `v10.23.0`.  
- Windows Build Tools are not installed correctly. (Please verify your installation method. The above recommended method of installing Node 14.15.1, and then downgrading is generally the least error prone)



#### 3) Run your application

In the terminal, run `node ./Twitch.js` in order to spin up the Twitch bot.  

Alternatively, if you wish to run only the Discord bot, run `node ./Discord.js`. If you wish to run both simultaneously, use `node ./app.js`


# Control mechanisms


# Twitch

All arguments take four inputs. The inputs are as follows:

## Parts of a command

#### Player (mandatory) 
Which character to control
##### Arguments
"1" (Targets Green)  
"2" (Targets Red)  
"3" (Targets Blue)  
"4" (Targets Purple)  

#### Button (mandatory)
Which button to press
##### Arguments
A  
B  
R  
L  
Up  
Down  
Left  
Right  
Start  
Select  


#### Duration (optional)
How long to press a button, in milliseconds. If left unspecified, defaults to 100 ms
##### Arguments
100-2500 (ms)

#### Delay (optional)
How long to hold off before pressing, in milliseconds. If left unspecified, defaults to 100 ms
##### Arguments
100-500 (ms)

## Inputting commands

Commands are input directly into Twitch chat. They are forward slash (/) separated.  

### Examples

Tell Player 1 (Green) to walk left for 1.5 seconds: *1/left/1500*  

Tell Player 3 (Blue) to swing his sword: *2/b*  

## Chaining complex commands

In some situations, it is necessary to chain complex commands. This can be useful for situations such as lifting a large rock in the game, which requires both holding down R and pulling in the direction opposite the rock.  

Chained commands are comma separated, and *do not* use the player argument, as the command assumes the first target command's player.

### Examples

Tell Player 2 to grab and lift and object for 1.5 seconds: 2/r/1500, left/1500  

Tell Player 4 to look right, hold out his sword for 2.5 seconds, and walk in that direction for 2 seconds: 4/right, b/2500, right/2500/500




# Discord

Discord commands follow a similar nature to Twitch, but do not rely on a player argument. Instead, the player argument is assumed by having a chat within a corresponding channel name (e.g., to target player 1 (Green), have a channel named "#green")




## Parts of a command

#### Channel* (mandatory) 

Which character to control. This is not an explicitly passeda argument, but instead the channel name the commands reside in.

##### Arguments
"#green" (Targets Green)  
"#red" (Targets Red)  
"#blue" (Targets Blue)  
"#purple" (Targets Purple)  

#### Button (mandatory)
Which button to press
##### Arguments
A  
B  
R  
L  
Up  
Down  
Left  
Right  
Start  
Select  


#### Duration (optional)
How long to press a button, in milliseconds. If left unspecified, defaults to 100 ms
##### Arguments
100-2500 (ms)

#### Delay (optional)
How long to hold off before pressing, in milliseconds. If left unspecified, defaults to 100 ms
##### Arguments
100-500 (ms)

## Inputting commands

Commands are input directly into Twitch chat. They are forward slash (/) separated.  

### Examples

Tell Player 1 (Green) to walk left for 1.5 seconds: (in channel #green) *left/1500*  

Tell Player 3 (Blue) to swing his sword: (in channel #blue) *b*  

## Chaining complex commands

In some situations, it is necessary to chain complex commands. This can be useful for situations such as lifting a large rock in the game, which requires both holding down R and pulling in the direction opposite the rock.  

Chained commands are comma separated, and *do not* use the player argument, as the command assumes the first target command's player.

### Examples

Tell Player 2 to grab and lift and object for 1.5 seconds: (in channel #red) r/1500, left/1500  

Tell Player 4 to look right, hold out his sword for 2.5 seconds, and walk in that direction for 2 seconds: (in channel #purple): right, b/2500, right/2500/500