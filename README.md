A very small extension to allow you to switch windows via gdbus. This is particularly useful if you are using wayland as utilities such as wmctrl won't work.

Since Gnome 41 removed org.gnome.Shell.Eval for security reasons, if you ever used a command such as:

```
gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval"var mw = global.get_window_actors().map(w=>w.meta_window).find(mw=>mw.get_title().includes('Firefox'));mw && mw.activate(0)"
```

this can now be replaced with:

```
gdbus call --session --dest org.gnome.Shell --object-path /org/switcheroo/Switcheroo --method org.switcheroo.Switcheroo.Set Firefox
```

This can then be assigned to a shortcut key in Gnome settings or called programmatically.