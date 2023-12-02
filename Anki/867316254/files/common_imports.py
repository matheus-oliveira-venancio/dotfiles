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

from aqt import mw

from os.path import abspath
addon_path = abspath(__file__+"/../../")

from re import sub
#                   `/` for mac, `\` for windows
addonfolder = sub(r'.*(/|\\)', '', addon_path)

files_folder_rel = f"/_addons/{addonfolder}/files/"

# for debugging since cant use print
from aqt.utils import showText

config = mw.addonManager.getConfig(__name__)

from os import path, makedirs
import json

# # check if config file exists, of not, create it
# if not path.exists(f'{addon_path}/user_files/config.json'):
#     makedirs(f'{addon_path}/user_files')
#     with open(f'{addon_path}/user_files/config.json', 'w') as file:
#         dict1 = {
#             "show 'studied cards today' in homescreen": False,
#             "editorButtonUL": False,
#             "editorButtonOL": False,
#             "editorButtonPara": False,
#             "code languages": {"Python": "py", "SQL": "sql", "None": "none"}
#         }
#         json.dump(dict1, file)

# config = json.load(open(f'{addon_path}/user_files/config.json', 'r'))
# # example: config["night mode"]

# if "show 'studied cards today' in homescreen" not in config:
#     config["show 'studied cards today' in homescreen"] = False

# if "editorButtonUL" not in config:
#     config["editorButtonUL"] = False

# if "editorButtonOL" not in config:
#     config["editorButtonOL"] = False

# if "editorButtonPara" not in config:
#     config["editorButtonPara"] = False

# if 'code languages' not in config:
#     config['code languages'] = {"Python": "py", "Javascript": "js"}