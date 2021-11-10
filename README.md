Since Gnome 41 removed org.gnome.Shell.Eval for security reason, this is a very small extension to replace switching focus of a window by using something like:

```
gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval"var mw = global.get_window_actors().map(w=>w.meta_window).find(mw=>mw.get_title().includes('Firefox'));mw && mw.activate(0)"
```

this can now be replaced with 

```
gdbus call --session --dest org.gnome.Shell --object-path /org/switcheroo/Switcheroo --method org.switcheroo.Switcheroo.Set Firefox
```