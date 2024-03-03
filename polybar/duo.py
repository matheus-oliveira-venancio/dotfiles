#.-----------------------------.
#| Duolingo Module for Polybar |
#'-----------------------------'
import duolingo
usr = ""
pas = ""
lingo  = duolingo.Duolingo(matheuspriv7@gmail.com, MatheusSoda21)

info = lingo.get_streak_info()
streak = info['streak_extended_today']
if streak == False:
    full = '%{F#FF0000}%{F-}'
if streak == True:




                full = '%{F#00FF00}%{F-}'
days = str(info['site_streak'])
full = "Duolingo ("+full+")-("+days+")%{F-}"

print(full)
