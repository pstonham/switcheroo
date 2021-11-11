/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const Gio = imports.gi.Gio;

const SwitcherooIface = `
<node>
    <interface name="org.switcheroo.Switcheroo">
        <method name="Set">
            <arg type="s" direction="in" name="name"/>
            <arg type="b" direction="out" name="success"/>
            <arg type="s" direction="out" name="returnValue"/>
        </method>
    </interface>
</node>`;

class Extension {
    enable() {
        this._dbusImpl = Gio.DBusExportedObject.wrapJSObject(SwitcherooIface, this);
        this._dbusImpl.export(Gio.DBus.session, '/org/switcheroo/Switcheroo');
    }

    disable() {
        if (this._dbusImpl) {
            this._dbusImpl.unexport();
            this._dbusImpl = null;
        }
    }

    Set(name) {
        let returnValue;
        let success;

        try {
            var mw = global.get_window_actors().map(w => w.meta_window).find(mw => mw.get_title().includes(name));
            mw && mw.activate(0);
            returnValue = '';
            success = true;
        } catch (e) {
            returnValue = `${e}`;
            success = false;
        }

        return [success, returnValue];
    }
}

function init() {
    return new Extension();
}
