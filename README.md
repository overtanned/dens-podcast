# Dens Podcast

## Preview
![](dens-podcast.gif)

## Attention
<br> This template relies heavily on javascript and AJAX requests don't work with the file:// protocol due to security restrictions, i.e. You need a server if your site fetches content through JavaScript. Hence, it is recommended to use a little development server with a live preview capability.

## Installation
<br>You need node.js and npm. You should probably install this globally.
```
npm install -g live-server
```
<br>Then cd to the project directory and run command
```
live-server
```

## Update Notes
<br>**28/08/2020**: Dens Podcast Homepage, Recommendations, Categories
<br>**31/08/2020**: Git Setup, Dividing into components, Dummy Header, Stories, Player (Cover, Title, Description)
<br>**01/09/2020**: Player (Play/Pause, Track, Duration, Volume Up/Down, Volume Bar), Playlist
<br>**02/09/2020**: Organize JSON data, Owl Carousel Implementation, Category Page, Playlist Page
<br>**03/09/2020**: Simplify AJAX Call, Simplify JS Functions, JSON Data Entry
<br>**04/09/2020**: Implement Playlist Page Player for each Episodes
<br>**07/09/2020**: Podcast Category Page, Podcast Subcategory
<br>**09/09/2020**: Penyesuaian struktur JSON (Podcast Categories, List Podcast by Category, Podcast Episodes)
<br>**10/09/2020**: Penyesuaian struktur JSON Podcast Categories & Content, Fix Player UI in small viewport, Penambahan Hover animation
<br>**11/09/2020**: Tombol Back pada halaman Category & Playlist sudah berfungsi
<br>**14/09/2020**: Perbaikan Path, Lokalisasi Beberapa Plugin, Perbaikan Chain Promises di Homepage, Page Animation, Perbaikan Responsive di Mobile View

## To Do List
<br>- Responsive Web Design Testing di Tablet
<br>- Fix Issues

## Known Issues
<br>- Terkadang thumbnail tampil besar ketika loading
<br>- Owl Carousel Overflow Visible masih buggy di Mobile View
<br>- Player ketika load duration muncul NaN:NaN sebentar

## Things Worth Noticing
<br>- Tiap Episode perlu upload date?