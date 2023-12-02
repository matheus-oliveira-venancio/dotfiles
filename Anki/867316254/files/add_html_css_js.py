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


from aqt.webview import WebContent
from aqt.toolbar import TopToolbar, BottomToolbar
from aqt.deckbrowser import DeckBrowser, DeckBrowserBottomBar
from aqt.reviewer import ReviewerBottomBar
from aqt.editor import Editor
from aqt.gui_hooks import webview_will_set_content
from typing import Any, Optional

import re

def on_webview_will_set_content(
    web_content: WebContent,
    context: Optional[Any]) -> None:
    # for all
    web_content.css.append(f"{files_folder_rel}css/all.css")
    if isinstance(context, TopToolbar):
        web_content.css.append(
            f"{files_folder_rel}css/top_toolbar.css")

        # font awesome icons
        decks_icon = f'<svg viewBox="0 0 512 512"><path fill="currentColor" d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"></path></svg>'
        add_icon = f'<svg viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>'
        browse_icon = f'<svg viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>'
        stats_icon = f'<svg viewBox="0 0 512 512"><path fill="currentColor" d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>'
        sync_icon = f'<svg id=sync-spinner class="no-reduce-motion" viewBox="0 0 512 512"><path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>'

        replace_navbar_buttons_dict = [
            {"id": "decks",
             "tooltip": "Decks\nShortcut: D",
             "img": decks_icon},
            {"id": "add",
             "tooltip": "Add Card\nShortcut: A",
             "img": add_icon},
            {"id": "browse",
             "tooltip": "Browse\nShortcut: B",
             "img": browse_icon},
            {"id": "stats",
             "tooltip": "Stats\nShortcut: T",
             "img": stats_icon},
            {"id": "sync",
             "tooltip": "Sync\nShortcut: Y",
             "img": sync_icon},
        ]

        new_body = web_content.body
        
        for item in replace_navbar_buttons_dict:
            # capture group 1 starts at `<a`, ends at `title="` within the 
            # opening tag
            # capture group 2 starts at ending `"` of title attribute , ends at 
            # `>` of the opening <a> tag
            find = r'(?s)(<a.*?title=").*?(".*?id="' + item["id"] + r'".*?>).*?(?=</a>)'
            # replace string will replace contents of `title="<contents>"` with 
            # the string from `item["tooltip"]`, and add the svg as the 
            # contents text of the <a></a> tag
            replace = r'\1' + item["tooltip"] + r'\2' + item["img"]
            new_body = re.sub(find, replace, new_body)
        
        web_content.body = new_body
        
        
        # ------------------- ANKIMOTE COMPATIBILITY ---------------------------

        web_content.head += '<script async' + \
                        f' src="{files_folder_rel}js/ankimote_patch.js"></script>'


    elif isinstance(context, DeckBrowser):
        web_content.css.append(
            f"{files_folder_rel}css/home.css")
        if config["hide 'studied cards today' in homescreen"] == True:
            # showText(str(config["hide 'studied cards today' in homescreen"]))
            web_content.css.append(
                f"{files_folder_rel}css/home_studiedToday.css")
    elif isinstance(context, DeckBrowserBottomBar):
        if config["hide bottom buttons in homescreen"] == True:
            web_content.css.append(
                f"{files_folder_rel}css/bottom_toolbar.css")
    elif isinstance(context, ReviewerBottomBar):
        web_content.css.append(
            f"{files_folder_rel}css/reviewer_bottom.css")
    elif isinstance(context, Editor):
        if config["modify editor appearance"] == True:
            web_content.css.append(
                f"{files_folder_rel}css/editor-window.css")
        
        # to make sure shadowroot is present, add script with async so it loads 
        # after html has loaded
        web_content.head += '<script async id="editor-script"' + \
                        f' src="{files_folder_rel}js/editor_theme.js"></script>'


webview_will_set_content.append(on_webview_will_set_content)