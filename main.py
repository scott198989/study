#!/usr/bin/env python3
"""
Production Floor Record Manager
Standalone offline Windows desktop application.
No internet required. Data stored locally in SQLite.
"""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sqlite3
import os
import sys
import csv
from datetime import datetime


# ═══════════════════════════════════════════════════════════════════
#  DATABASE
# ═══════════════════════════════════════════════════════════════════

def get_db_path():
    """Always store the database next to the .exe (or script)."""
    if getattr(sys, 'frozen', False):
        base = os.path.dirname(sys.executable)
    else:
        base = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base, 'production_records.db')


def get_conn():
    conn = sqlite3.connect(get_db_path())
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_conn() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS records (
                id                  INTEGER PRIMARY KEY AUTOINCREMENT,
                item_id             TEXT    UNIQUE NOT NULL,
                customer_name       TEXT    NOT NULL DEFAULT '',
                scheduled_line      TEXT    NOT NULL DEFAULT '',
                customer_po         TEXT    NOT NULL DEFAULT '',
                sales_blend         TEXT    NOT NULL DEFAULT '',
                ship_date           TEXT    NOT NULL DEFAULT '',
                alt_blend_id        TEXT    NOT NULL DEFAULT '',
                width_value         TEXT    NOT NULL DEFAULT '',
                width_unit          TEXT    NOT NULL DEFAULT 'inches',
                thickness           TEXT    NOT NULL DEFAULT '',
                wind_direction      TEXT    NOT NULL DEFAULT 'in',
                treat_direction     TEXT    NOT NULL DEFAULT 'in',
                core_align_nrc      TEXT    NOT NULL DEFAULT '',
                roll_od_target      TEXT    NOT NULL DEFAULT '',
                roll_od_min         TEXT    NOT NULL DEFAULT '',
                roll_od_max         TEXT    NOT NULL DEFAULT '',
                roll_footage_target TEXT    NOT NULL DEFAULT '',
                roll_footage_min    TEXT    NOT NULL DEFAULT '',
                roll_footage_max    TEXT    NOT NULL DEFAULT '',
                roll_weight_target  TEXT    NOT NULL DEFAULT '',
                roll_weight_min     TEXT    NOT NULL DEFAULT '',
                roll_weight_max     TEXT    NOT NULL DEFAULT '',
                edge_weave_max      TEXT    NOT NULL DEFAULT '',
                treat_target        TEXT    NOT NULL DEFAULT '',
                treat_min           TEXT    NOT NULL DEFAULT '',
                treat_max           TEXT    NOT NULL DEFAULT '',
                blend_notes         TEXT    NOT NULL DEFAULT '',
                customer_complaints TEXT    NOT NULL DEFAULT '',
                created_at          TEXT    NOT NULL DEFAULT '',
                updated_at          TEXT    NOT NULL DEFAULT ''
            )
        ''')
        # Index on item_id (primary search key) and customer name
        conn.execute(
            'CREATE INDEX IF NOT EXISTS idx_item_id ON records(item_id COLLATE NOCASE)'
        )
        conn.execute(
            'CREATE INDEX IF NOT EXISTS idx_customer ON records(customer_name COLLATE NOCASE)'
        )
        conn.commit()


def db_search(query='', field='item_id'):
    with get_conn() as conn:
        if query.strip():
            rows = conn.execute(
                f'SELECT * FROM records WHERE {field} LIKE ? ORDER BY item_id COLLATE NOCASE',
                (f'%{query.strip()}%',)
            ).fetchall()
        else:
            rows = conn.execute(
                'SELECT * FROM records ORDER BY item_id COLLATE NOCASE'
            ).fetchall()
    return [dict(r) for r in rows]


def db_get(item_id):
    with get_conn() as conn:
        row = conn.execute(
            'SELECT * FROM records WHERE item_id = ? COLLATE NOCASE', (item_id,)
        ).fetchone()
    return dict(row) if row else None


def db_save(data, is_edit=False):
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with get_conn() as conn:
        if is_edit:
            data['updated_at'] = now
            conn.execute('''
                UPDATE records SET
                    customer_name=:customer_name,
                    scheduled_line=:scheduled_line,
                    customer_po=:customer_po,
                    sales_blend=:sales_blend,
                    ship_date=:ship_date,
                    alt_blend_id=:alt_blend_id,
                    width_value=:width_value,
                    width_unit=:width_unit,
                    thickness=:thickness,
                    wind_direction=:wind_direction,
                    treat_direction=:treat_direction,
                    core_align_nrc=:core_align_nrc,
                    roll_od_target=:roll_od_target,
                    roll_od_min=:roll_od_min,
                    roll_od_max=:roll_od_max,
                    roll_footage_target=:roll_footage_target,
                    roll_footage_min=:roll_footage_min,
                    roll_footage_max=:roll_footage_max,
                    roll_weight_target=:roll_weight_target,
                    roll_weight_min=:roll_weight_min,
                    roll_weight_max=:roll_weight_max,
                    edge_weave_max=:edge_weave_max,
                    treat_target=:treat_target,
                    treat_min=:treat_min,
                    treat_max=:treat_max,
                    blend_notes=:blend_notes,
                    customer_complaints=:customer_complaints,
                    updated_at=:updated_at
                WHERE item_id=:item_id
            ''', data)
        else:
            data['created_at'] = now
            data['updated_at'] = now
            conn.execute('''
                INSERT INTO records (
                    item_id, customer_name, scheduled_line, customer_po,
                    sales_blend, ship_date, alt_blend_id,
                    width_value, width_unit, thickness,
                    wind_direction, treat_direction, core_align_nrc,
                    roll_od_target, roll_od_min, roll_od_max,
                    roll_footage_target, roll_footage_min, roll_footage_max,
                    roll_weight_target, roll_weight_min, roll_weight_max,
                    edge_weave_max, treat_target, treat_min, treat_max,
                    blend_notes, customer_complaints, created_at, updated_at
                ) VALUES (
                    :item_id, :customer_name, :scheduled_line, :customer_po,
                    :sales_blend, :ship_date, :alt_blend_id,
                    :width_value, :width_unit, :thickness,
                    :wind_direction, :treat_direction, :core_align_nrc,
                    :roll_od_target, :roll_od_min, :roll_od_max,
                    :roll_footage_target, :roll_footage_min, :roll_footage_max,
                    :roll_weight_target, :roll_weight_min, :roll_weight_max,
                    :edge_weave_max, :treat_target, :treat_min, :treat_max,
                    :blend_notes, :customer_complaints, :created_at, :updated_at
                )
            ''', data)
        conn.commit()


def db_delete(item_id):
    with get_conn() as conn:
        conn.execute('DELETE FROM records WHERE item_id = ?', (item_id,))
        conn.commit()


# ═══════════════════════════════════════════════════════════════════
#  THEME / CONSTANTS
# ═══════════════════════════════════════════════════════════════════

LINES = ['', '210', '212', '215', '216', '217', '221', '222', '223', '224']

C = {
    'bg':       '#1a1a2e',
    'surface':  '#16213e',
    'surface2': '#0f3460',
    'border':   '#2d2d5e',
    'accent':   '#e94560',
    'accent2':  '#4a90d9',
    'text':     '#e0e0e0',
    'text_dim': '#8888aa',
    'green':    '#4caf50',
    'red':      '#e53935',
    'entry':    '#0d1b2a',
    'head_bg':  '#0d0d1f',
    'btn':      '#2d2d5e',
    'btn2':     '#1a3a5c',
    'row_odd':  '#12122a',
    'row_even': '#16163a',
    'sel':      '#e94560',
}

FN   = ('Segoe UI', 10)
FNB  = ('Segoe UI', 10, 'bold')
FNS  = ('Segoe UI', 9)
FNT  = ('Segoe UI', 13, 'bold')
FNL  = ('Segoe UI', 9)
FNMONO = ('Consolas', 10)


# ═══════════════════════════════════════════════════════════════════
#  STYLED HELPERS
# ═══════════════════════════════════════════════════════════════════

def make_btn(parent, text, cmd, color=None, fg='white', font=FNB, padx=14, pady=5):
    bg = color or C['btn']
    b = tk.Button(parent, text=text, command=cmd,
                  bg=bg, fg=fg, activebackground=bg, activeforeground=fg,
                  relief='flat', font=font, padx=padx, pady=pady,
                  cursor='hand2', bd=0)
    return b


def make_label(parent, text, fg=None, font=None, **kw):
    return tk.Label(parent, text=text,
                    bg=kw.pop('bg', C['bg']),
                    fg=fg or C['text_dim'],
                    font=font or FNL, **kw)


def make_entry(parent, var, width=None, font=None):
    kw = dict(textvariable=var, bg=C['entry'], fg=C['text'],
              relief='flat', font=font or FN,
              insertbackground=C['text'], bd=4,
              highlightthickness=1, highlightcolor=C['accent2'],
              highlightbackground=C['border'])
    if width:
        kw['width'] = width
    return tk.Entry(parent, **kw)


def make_combo(parent, var, values, width=None):
    kw = dict(textvariable=var, values=values, state='readonly', font=FN)
    if width:
        kw['width'] = width
    return ttk.Combobox(parent, **kw)


# ═══════════════════════════════════════════════════════════════════
#  RECORD FORM  (New / Edit)
# ═══════════════════════════════════════════════════════════════════

class RecordForm(tk.Toplevel):
    def __init__(self, parent, record=None, on_save=None):
        super().__init__(parent)
        self.on_save   = on_save
        self.is_edit   = record is not None
        self.record    = record or {}
        self._vars     = {}
        self._texts    = {}   # tk.Text widgets (blend_notes, complaints)

        title = 'Edit Record' if self.is_edit else 'New Record'
        self.title(title)
        self.configure(bg=C['bg'])
        self.geometry('800x720')
        self.minsize(700, 500)
        self.resizable(True, True)
        self.transient(parent)
        self.grab_set()

        self._build_ui()
        if self.is_edit:
            self._populate()

        self.update_idletasks()
        px = parent.winfo_x() + (parent.winfo_width()  - self.winfo_width())  // 2
        py = parent.winfo_y() + (parent.winfo_height() - self.winfo_height()) // 2
        self.geometry(f'+{max(px,0)}+{max(py,0)}')

    # ── Layout ────────────────────────────────────────────────────

    def _build_ui(self):
        # Header bar
        hdr = tk.Frame(self, bg=C['head_bg'], pady=10)
        hdr.pack(fill='x')
        tk.Label(hdr, text='Edit Record' if self.is_edit else 'New Record',
                 bg=C['head_bg'], fg=C['text'], font=FNT).pack(side='left', padx=16)

        # Scrollable body
        outer = tk.Frame(self, bg=C['bg'])
        outer.pack(fill='both', expand=True)

        self._canvas = tk.Canvas(outer, bg=C['bg'], highlightthickness=0)
        vsb = ttk.Scrollbar(outer, orient='vertical', command=self._canvas.yview)
        self._body = tk.Frame(self._canvas, bg=C['bg'])

        self._body.bind('<Configure>',
            lambda e: self._canvas.configure(scrollregion=self._canvas.bbox('all')))
        self._win_id = self._canvas.create_window((0, 0), window=self._body, anchor='nw')
        self._canvas.configure(yscrollcommand=vsb.set)
        self._canvas.bind('<Configure>',
            lambda e: self._canvas.itemconfig(self._win_id, width=e.width))

        vsb.pack(side='right', fill='y')
        self._canvas.pack(side='left', fill='both', expand=True)

        self._canvas.bind('<Enter>',
            lambda e: self._canvas.bind_all('<MouseWheel>', self._on_scroll))
        self._canvas.bind('<Leave>',
            lambda e: self._canvas.unbind_all('<MouseWheel>'))

        self._build_fields()

        # Footer buttons
        ftr = tk.Frame(self, bg=C['head_bg'], pady=8)
        ftr.pack(fill='x', side='bottom')
        make_btn(ftr, 'Cancel', self.destroy, color=C['btn']).pack(side='right', padx=(4, 16))
        make_btn(ftr, '  Save Record  ', self._save, color=C['accent']).pack(side='right', padx=4)

    def _on_scroll(self, event):
        self._canvas.yview_scroll(-1 * (event.delta // 120), 'units')

    # ── Field builders ────────────────────────────────────────────

    def _section(self, title):
        f = tk.Frame(self._body, bg=C['bg'])
        f.pack(fill='x', padx=14, pady=(14, 2))
        tk.Label(f, text=title, bg=C['bg'], fg=C['accent'], font=FNB).pack(anchor='w')
        tk.Frame(f, bg=C['border'], height=1).pack(fill='x', pady=(2, 0))

    def _row(self):
        r = tk.Frame(self._body, bg=C['bg'])
        r.pack(fill='x', padx=14, pady=3)
        return r

    def _col(self, row, label, key, required=False, entry_font=None):
        """Single text-entry column inside a row."""
        c = tk.Frame(row, bg=C['bg'])
        c.pack(side='left', expand=True, fill='x', padx=(0, 10))
        lbl = f'{label} *' if required else label
        make_label(c, lbl, bg=C['bg']).pack(anchor='w')
        var = tk.StringVar()
        self._vars[key] = var
        make_entry(c, var, font=entry_font).pack(fill='x', ipady=3)
        return var

    def _col_combo(self, row, label, key, choices, default=None):
        c = tk.Frame(row, bg=C['bg'])
        c.pack(side='left', expand=True, fill='x', padx=(0, 10))
        make_label(c, label, bg=C['bg']).pack(anchor='w')
        var = tk.StringVar(value=default or choices[0])
        self._vars[key] = var
        cb = make_combo(c, var, choices)
        cb.pack(fill='x', ipady=2)
        return var

    def _spacer_col(self, row):
        tk.Frame(row, bg=C['bg']).pack(side='left', expand=True, fill='x', padx=(0, 10))

    def _textarea_field(self, label, key, height=4):
        f = tk.Frame(self._body, bg=C['bg'])
        f.pack(fill='x', padx=14, pady=3)
        make_label(f, label, bg=C['bg']).pack(anchor='w')
        txt = tk.Text(f, height=height, bg=C['entry'], fg=C['text'],
                      relief='flat', font=FN, insertbackground=C['text'],
                      wrap='word', bd=4,
                      highlightthickness=1, highlightcolor=C['accent2'],
                      highlightbackground=C['border'])
        txt.pack(fill='x')
        self._texts[key] = txt
        return txt

    # ── Build all fields ──────────────────────────────────────────

    def _build_fields(self):
        # ── Identification ────────────────────────────────────────
        self._section('Identification')

        r = self._row()
        self._col(r, 'Item ID  (e.g. F-ABCD-1234)', 'item_id', required=True, entry_font=FNMONO)
        self._col(r, 'Customer Name', 'customer_name', required=True)

        r = self._row()
        self._col_combo(r, 'Scheduled Line', 'scheduled_line', LINES)
        self._col(r, 'Customer PO#  (e.g. 12345-12345)', 'customer_po', entry_font=FNMONO)

        r = self._row()
        self._col(r, 'Sales Blend  (e.g. A1234.A12345)', 'sales_blend', entry_font=FNMONO)
        self._col(r, 'Ship Date  (DD/MM/YYYY)', 'ship_date')

        r = self._row()
        self._col(r, 'Alternate Blend ID  (optional)', 'alt_blend_id', entry_font=FNMONO)
        self._spacer_col(r)

        # ── Physical Specifications ───────────────────────────────
        self._section('Physical Specifications')

        r = self._row()
        self._col(r, 'Width', 'width_value')
        self._col_combo(r, 'Width Unit', 'width_unit', ['inches', 'mm'])
        self._col(r, 'Thickness', 'thickness')

        # ── Configuration ─────────────────────────────────────────
        self._section('Configuration')

        r = self._row()
        self._col_combo(r, 'Wind Direction (Sealant Side)', 'wind_direction', ['in', 'out'])
        self._col_combo(r, 'Treat Direction', 'treat_direction', ['in', 'out'])
        self._col(r, 'Core Align NRC (inches)', 'core_align_nrc')

        # ── Roll OD ───────────────────────────────────────────────
        self._section('Roll OD')
        r = self._row()
        self._col(r, 'Target', 'roll_od_target')
        self._col(r, 'Min', 'roll_od_min')
        self._col(r, 'Max', 'roll_od_max')

        # ── Roll Footage ──────────────────────────────────────────
        self._section('Roll Footage')
        r = self._row()
        self._col(r, 'Target', 'roll_footage_target')
        self._col(r, 'Min', 'roll_footage_min')
        self._col(r, 'Max', 'roll_footage_max')

        # ── Roll Weight ───────────────────────────────────────────
        self._section('Roll Weight')
        r = self._row()
        self._col(r, 'Target', 'roll_weight_target')
        self._col(r, 'Min', 'roll_weight_min')
        self._col(r, 'Max', 'roll_weight_max')

        # ── Treat ─────────────────────────────────────────────────
        self._section('Treat')
        r = self._row()
        self._col(r, 'Edge Weave Max (inches)', 'edge_weave_max')
        self._col(r, 'Target', 'treat_target')
        self._col(r, 'Min', 'treat_min')
        self._col(r, 'Max', 'treat_max')

        # ── Notes ─────────────────────────────────────────────────
        self._section('Notes')
        self._textarea_field('Blend Notes', 'blend_notes', height=4)
        self._textarea_field('Customer Complaints', 'customer_complaints', height=4)

        # Bottom padding
        tk.Frame(self._body, bg=C['bg'], height=16).pack()

    # ── Data helpers ──────────────────────────────────────────────

    def _populate(self):
        for key, var in self._vars.items():
            val = self.record.get(key) or ''
            var.set(val)
        for key, widget in self._texts.items():
            val = self.record.get(key) or ''
            widget.insert('1.0', val)
        # Lock item_id when editing
        for child in self._body.winfo_children():
            self._lock_item_id_entry(child)

    def _lock_item_id_entry(self, widget):
        """Recursively find the item_id entry and make it read-only."""
        if isinstance(widget, tk.Entry):
            if widget.cget('textvariable') == str(self._vars.get('item_id')):
                widget.configure(state='disabled', disabledforeground=C['text_dim'],
                                 disabledbackground=C['entry'])
                return
        for child in widget.winfo_children():
            self._lock_item_id_entry(child)

    def _get(self, key):
        if key in self._texts:
            return self._texts[key].get('1.0', 'end-1c').strip()
        var = self._vars.get(key)
        return var.get().strip() if var else ''

    def _save(self):
        item_id = self._get('item_id')
        if not item_id:
            messagebox.showerror('Missing Field', 'Item ID is required.', parent=self)
            return
        if not self._get('customer_name'):
            messagebox.showerror('Missing Field', 'Customer Name is required.', parent=self)
            return

        data = {}
        for key in self._vars:
            data[key] = self._get(key)
        for key in self._texts:
            data[key] = self._get(key)

        try:
            db_save(data, is_edit=self.is_edit)
            if self.on_save:
                self.on_save()
            self.destroy()
        except sqlite3.IntegrityError:
            messagebox.showerror(
                'Duplicate Item ID',
                f'Item ID "{item_id}" already exists.\nEdit the existing record or use a different ID.',
                parent=self
            )
        except Exception as exc:
            messagebox.showerror('Save Error', str(exc), parent=self)


# ═══════════════════════════════════════════════════════════════════
#  MAIN WINDOW
# ═══════════════════════════════════════════════════════════════════

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('Production Floor Records')
        self.configure(bg=C['bg'])
        self.geometry('1150x680')
        self.minsize(800, 480)

        init_db()
        self._sort_col   = 'item_id'
        self._sort_asc   = True
        self._all_records = []

        self._setup_styles()
        self._build_ui()
        self._refresh()

        self.update_idletasks()
        sw, sh = self.winfo_screenwidth(), self.winfo_screenheight()
        x = (sw - self.winfo_width())  // 2
        y = (sh - self.winfo_height()) // 2
        self.geometry(f'+{max(x,0)}+{max(y,0)}')

    # ── ttk styles ────────────────────────────────────────────────

    def _setup_styles(self):
        s = ttk.Style()
        s.theme_use('clam')

        s.configure('Treeview',
                    background=C['row_even'],
                    foreground=C['text'],
                    fieldbackground=C['row_even'],
                    rowheight=28,
                    borderwidth=0,
                    font=FN)
        s.configure('Treeview.Heading',
                    background=C['head_bg'],
                    foreground=C['text_dim'],
                    relief='flat',
                    font=FNB)
        s.map('Treeview',
              background=[('selected', C['accent'])],
              foreground=[('selected', 'white')])
        s.map('Treeview.Heading',
              background=[('active', C['border'])])

        s.configure('Vertical.TScrollbar',
                    background=C['border'],
                    troughcolor=C['surface'],
                    borderwidth=0,
                    arrowcolor=C['text_dim'])
        s.configure('Horizontal.TScrollbar',
                    background=C['border'],
                    troughcolor=C['surface'],
                    borderwidth=0,
                    arrowcolor=C['text_dim'])

        s.configure('TCombobox',
                    fieldbackground=C['entry'],
                    background=C['entry'],
                    foreground=C['text'],
                    arrowcolor=C['text'],
                    borderwidth=0)

    # ── UI construction ───────────────────────────────────────────

    def _build_ui(self):
        self._build_header()
        self._build_toolbar()
        self._build_table()
        self._build_action_bar()

    def _build_header(self):
        hdr = tk.Frame(self, bg=C['head_bg'], pady=10)
        hdr.pack(fill='x')
        tk.Label(hdr, text='Production Floor Records',
                 bg=C['head_bg'], fg=C['text'], font=FNT).pack(side='left', padx=16)
        tk.Label(hdr, text=f'Data: {get_db_path()}',
                 bg=C['head_bg'], fg=C['text_dim'], font=FNS).pack(side='right', padx=16)

    def _build_toolbar(self):
        bar = tk.Frame(self, bg=C['surface'], pady=8)
        bar.pack(fill='x')

        # Search label + entry
        make_label(bar, 'Search:', bg=C['surface'], font=FNB).pack(side='left', padx=(12, 4))

        self._q = tk.StringVar()
        self._q.trace_add('write', lambda *_: self._refresh())
        e = make_entry(bar, self._q, width=28)
        e.pack(side='left', padx=4, ipady=3)
        e.bind('<Escape>', lambda _: self._q.set(''))

        # Field selector radios
        make_label(bar, 'by:', bg=C['surface']).pack(side='left', padx=(6, 2))
        self._field = tk.StringVar(value='item_id')
        for lbl, val in [('Item ID', 'item_id'), ('Customer', 'customer_name'),
                         ('PO#', 'customer_po'), ('Sales Blend', 'sales_blend')]:
            tk.Radiobutton(bar, text=lbl, variable=self._field, value=val,
                           bg=C['surface'], fg=C['text_dim'],
                           selectcolor=C['bg'], activebackground=C['surface'],
                           activeforeground=C['text'], font=FNS,
                           command=self._refresh).pack(side='left', padx=2)

        make_btn(bar, 'Clear', lambda: self._q.set(''), color=C['btn'],
                 font=FNS, padx=8, pady=3).pack(side='left', padx=6)

        # Right-side buttons
        make_btn(bar, '+ New Record', self._new,
                 color=C['accent'], padx=14, pady=5).pack(side='right', padx=(4, 12))
        make_btn(bar, 'Export CSV', self._export_csv,
                 color=C['btn2'], font=FNS, padx=8, pady=3).pack(side='right', padx=4)

    def _build_table(self):
        frame = tk.Frame(self, bg=C['bg'])
        frame.pack(fill='both', expand=True)

        self._cols = [
            ('item_id',            'Item ID',       130),
            ('customer_name',      'Customer',       160),
            ('scheduled_line',     'Line',            55),
            ('customer_po',        'Customer PO#',   130),
            ('sales_blend',        'Sales Blend',    140),
            ('ship_date',          'Ship Date',      100),
            ('width_value',        'Width',           70),
            ('width_unit',         'Unit',            55),
            ('thickness',          'Thickness',       80),
            ('wind_direction',     'Wind Dir',        70),
            ('treat_direction',    'Treat Dir',       70),
            ('updated_at',         'Last Updated',   130),
        ]

        self._tree = ttk.Treeview(frame,
                                  columns=[c[0] for c in self._cols],
                                  show='headings',
                                  selectmode='browse')

        for cid, heading, w in self._cols:
            self._tree.heading(cid, text=heading,
                               command=lambda c=cid: self._sort_by(c))
            self._tree.column(cid, width=w, minwidth=40)

        vsb = ttk.Scrollbar(frame, orient='vertical',   command=self._tree.yview)
        hsb = ttk.Scrollbar(frame, orient='horizontal', command=self._tree.xview)
        self._tree.configure(yscrollcommand=vsb.set, xscrollcommand=hsb.set)

        hsb.pack(side='bottom', fill='x')
        vsb.pack(side='right',  fill='y')
        self._tree.pack(side='left', fill='both', expand=True)

        self._tree.tag_configure('odd',  background=C['row_odd'])
        self._tree.tag_configure('even', background=C['row_even'])

        self._tree.bind('<Double-1>', lambda _: self._edit())
        self._tree.bind('<Return>',   lambda _: self._edit())

    def _build_action_bar(self):
        bar = tk.Frame(self, bg=C['head_bg'], pady=6)
        bar.pack(fill='x', side='bottom')

        self._status = make_label(bar, 'Ready', bg=C['head_bg'])
        self._status.pack(side='left', padx=12)

        self._count_lbl = make_label(bar, '', bg=C['head_bg'])
        self._count_lbl.pack(side='right', padx=12)

        make_btn(bar, 'Delete Selected', self._delete,
                 color=C['red'], font=FNS, padx=10, pady=3).pack(side='right', padx=4)
        make_btn(bar, 'Edit Selected', self._edit,
                 color=C['accent2'], font=FNS, padx=10, pady=3).pack(side='right', padx=4)

    # ── Data operations ───────────────────────────────────────────

    def _refresh(self, *_):
        records = db_search(self._q.get(), self._field.get())
        self._all_records = records
        self._render(records)

    def _render(self, records):
        self._tree.delete(*self._tree.get_children())
        for i, rec in enumerate(records):
            tag = 'odd' if i % 2 else 'even'
            width_display = rec['width_value']
            if rec.get('width_unit'):
                width_display = f"{rec['width_value']} {rec['width_unit']}".strip()
            self._tree.insert('', 'end', iid=rec['item_id'], tags=(tag,),
                              values=(
                                  rec['item_id'],
                                  rec['customer_name'],
                                  rec['scheduled_line'],
                                  rec['customer_po'],
                                  rec['sales_blend'],
                                  rec['ship_date'],
                                  rec['width_value'],
                                  rec['width_unit'],
                                  rec['thickness'],
                                  rec['wind_direction'],
                                  rec['treat_direction'],
                                  rec['updated_at'],
                              ))
        n = len(records)
        self._count_lbl.config(text=f'{n} record{"s" if n != 1 else ""}')

    def _sort_by(self, col):
        if self._sort_col == col:
            self._sort_asc = not self._sort_asc
        else:
            self._sort_col = col
            self._sort_asc = True
        records = sorted(
            self._all_records,
            key=lambda r: (r.get(col) or '').lower(),
            reverse=not self._sort_asc
        )
        self._render(records)

    def _selected_id(self):
        sel = self._tree.selection()
        return sel[0] if sel else None

    def _new(self):
        RecordForm(self, on_save=self._on_saved)

    def _edit(self):
        iid = self._selected_id()
        if not iid:
            messagebox.showinfo('No Selection', 'Select a record first.')
            return
        rec = db_get(iid)
        if rec:
            RecordForm(self, record=rec, on_save=self._on_saved)

    def _delete(self):
        iid = self._selected_id()
        if not iid:
            messagebox.showinfo('No Selection', 'Select a record first.')
            return
        if messagebox.askyesno('Confirm Delete',
                               f'Permanently delete record  "{iid}"?\n\nThis cannot be undone.',
                               icon='warning'):
            db_delete(iid)
            self._refresh()
            self._status.config(text=f'Deleted: {iid}')

    def _on_saved(self):
        self._refresh()
        self._status.config(text=f'Record saved  —  {datetime.now().strftime("%H:%M:%S")}')

    def _export_csv(self):
        records = db_search(self._q.get(), self._field.get())
        if not records:
            messagebox.showinfo('No Data', 'No records match the current search.')
            return
        path = filedialog.asksaveasfilename(
            defaultextension='.csv',
            filetypes=[('CSV files', '*.csv'), ('All files', '*.*')],
            initialfile=f'production_records_{datetime.now().strftime("%Y%m%d")}.csv',
            title='Export Records'
        )
        if not path:
            return
        with open(path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=records[0].keys())
            writer.writeheader()
            writer.writerows(records)
        self._status.config(
            text=f'Exported {len(records)} record{"s" if len(records)!=1 else ""} → {os.path.basename(path)}'
        )


# ═══════════════════════════════════════════════════════════════════
#  ENTRY POINT
# ═══════════════════════════════════════════════════════════════════

if __name__ == '__main__':
    App().mainloop()
