# -*- coding: utf-8 -*-
# Name: Right Hand Answer Shortcuts
# Copyright: Kun Lin
# License: GNU GPL, version 3 or later; http://www.gnu.org/copyleft/gpl.html
#
# Adapted for Anki 2.1 from Vitalie Spinu's Anki 2.0 add-on
#
# Binds 'h', 'j', 'k', 'l' to answer buttons(fail, hard, normal, easy).
# Binds 'u' to undo.
# Binds 'i' to edit.
#

from aqt import mw
from aqt.reviewer import Reviewer
from anki.hooks import wrap

def shortcutKeys(self, _old):
    return [
            ("h", lambda: self._answerCard(1)),  # fail
            ("j", lambda: self._answerCard(2)),  # hard
            ("k", lambda: self._answerCard(3)),  # normal
            ("l", lambda: self._answerCard(4)),  # easy
            ("u", lambda: mw.onUndo()),  # undo
        ] + _old(self)


def answerCard(self, ease, _old):
    if self.state == "question":
        self.state = 'answer'

    _old(self, min(self.mw.col.sched.answerButtons(self.card), ease))
    

Reviewer._shortcutKeys = wrap(Reviewer._shortcutKeys, shortcutKeys, "around")
Reviewer._answerCard = wrap(Reviewer._answerCard, answerCard, "around")

