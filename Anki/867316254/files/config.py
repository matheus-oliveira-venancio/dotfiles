# ------------------------------------------------------------------------------
#
# MIT License
#
# Copyright (c) 2021 nogira
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# ------------------------------------------------------------------------------

from .common_imports import *

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

# from aqt.qt import QMainWindow, QVBoxLayout, QHBoxLayout, QCheckBox, QLabel, QPushButton, QWidget, QPlainTextEdit, QStyle, QIcon

# class ConfigWindow(QMainWindow):
#     def __init__(self):
#         super().__init__()
#         self.setWindowTitle("Minimal Theme Settings")
#         layout = QVBoxLayout()

#         global config

#         # ----------------------------------------------------------------------

#         # ------ cards studied today - homescreen ------
        
#         self.opt1 = QCheckBox("Show 'studied cards today' in homescreen.")
#         self.opt1.setChecked(config["show 'studied cards today' in homescreen"])
#         layout.addWidget(self.opt1)

#         space = QLabel(" ")
#         layout.addWidget(space)
        
#         # ------ editor buttons ------
        
#         self.opt1 = QCheckBox("Show 'unordered list' editor button")
#         self.opt1.setChecked(config["editorButtonUL"])
#         layout.addWidget(self.opt1)
        
#         self.opt1 = QCheckBox("Show 'ordered list' editor button")
#         self.opt1.setChecked(config["editorButtonOL"])
#         layout.addWidget(self.opt1)
        
#         self.opt1 = QCheckBox("Show 'paragraph modifier' editor button")
#         self.opt1.setChecked(config["editorButtonPara"])
#         layout.addWidget(self.opt1)
        
#         space = QLabel(" ")
#         layout.addWidget(space)
        
#         # ------ code languages ------
        
#         # --- label ---
        
#         code_label = QLabel("Code Languages to Choose From:")
#         # code_label.setIcon(self.style().standardIcon(getattr(QStyle, "SP_FileDialogInfoView")))
        
#         code_label_info_icon = QLabel("💬")#.setPixmap(self.style().standardIcon(getattr(QStyle, "SP_FileDialogInfoView")))
#         code_label_info_icon.setToolTip('- One line per languge\n- Format of: \"<Name>,<prismjs id>\"\n- Example: \"Python,py\"\n- Find prism js IDs at prismjs.com/#supported-languages')
        
#         h_box = QHBoxLayout()
#         h_box.addWidget(code_label)
#         h_box.addStretch()
#         h_box.addWidget(code_label_info_icon)

#         layout.addLayout(h_box)

#         # --- text box ---
        
#         self.text_box = QPlainTextEdit()
#         temp_code_list = []
#         for key, value in config['code languages'].items():
#             temp_code_list.append(key+","+value)
#         self.text_box.insertPlainText('\n'.join(temp_code_list))
#         layout.addWidget(self.text_box)

#         layout.addWidget(space)
        
#         # ------ save button ------

#         msg = QLabel("Restart anki for all changes to take effect")
#         layout.addWidget(msg)

#         layout.addWidget(space)

#         btn1 = QPushButton("Save")
#         btn1.clicked.connect(self.save_to_file)
#         layout.addWidget(btn1)

#         # ----------------------------------------------------------------------

#         widget = QWidget()
#         widget.setLayout(layout)
#         self.setCentralWidget(widget)

#         # this is to save the new dictionary values if they were set in the try/except statements
#         self.save_to_file()

#     def save_to_file(self):
#         global config

#         config["show 'studied cards today' in homescreen"] = self.opt1.isChecked()
        
#         config["editorButtonUL"] = self.opt1.isChecked()
#         config["editorButtonOL"] = self.opt1.isChecked()
#         config["editorButtonPara"] = self.opt1.isChecked()

#         # remove code values from dict so when re-added the order of the items is able to be updated too
#         config['code languages'] = {}
#         langs = self.text_box.toPlainText().split('\n')
#         for lang in langs:
#             name, id = lang.split(',')
#             config['code languages'][name] = id


#         with open(f'{addon_path}/user_files/config.json', 'w') as file:
#             json.dump(config, file)


#         # DeckBrowser.refresh()

#         # class AnkiQt(QMainWindow):
#         #     def setupDeckBrowser(self) -> None:
#         #         from aqt.deckbrowser import DeckBrowser

#         #         self.deckBrowser = DeckBrowser(self)
#         # mw.deckBrowser.refresh()
        
#         self.close()

# # get the addon window instance
# from aqt import dialogs

# # open new window (ConfigWindow) linked to anki main window (mw) so it doesn't auto-close
# def show_new_window():
#     dialogs._dialogs["AddonsDialog"][1].close()
#     mw.myW = w = ConfigWindow()
#     w.show()

# mw.addonManager.setConfigAction(__name__, show_new_window)


# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

# send list of languages to js on request

from aqt.gui_hooks import webview_did_receive_js_message
from typing import Any, Tuple

import json

def on_webview_did_receive_js_message(
    handled: Tuple[bool, Any],
    message: str,
    context: Any):

    if message == "get_config":
        output = json.dumps(config)
        return (True, output)

    else:
        return handled


webview_did_receive_js_message.append(on_webview_did_receive_js_message)