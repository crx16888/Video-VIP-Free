import webbrowser
import tkinter as tk
import sys
import re


def creat_window():
    def open_url(url):
        webbrowser.open(url)

    def test_status(event):
        if event.keysym == 'Return':
            return
        label2.config(text='')

    def get_video():
        video_url = f'https://jx.xmflv.cc/?url={entry.get()}' # 实际上是调了这个网站接口对付费视频进行解析
        if entry.get() == '':
            label2.config(text='链接不能为空，请重新输入!')
            return print('链接不能为空，请重新输入!')
        if not re.match(r'^(https?://)', entry.get()):
            label2.config(text='链接格式有误，请重新输入!')
            return print('链接格式有误，请重新输入!')

        webbrowser.open(video_url)
        print("正在打开:" + video_url)

    def click_Enter(event):
        get_video()

    def clear_url(event):
        entry.delete(0, 'end')

    def center_window(window, width, height):
        screen_width = window.winfo_screenwidth()
        screen_height = window.winfo_screenheight()
        x = (screen_width // 2) - (width // 2)
        y = (screen_height // 2) - (height // 2)
        window.geometry(f'{width}x{height}+{x}+{y}')

    window = tk.Tk()
    window.title('全网VIP视频解析爬取')
    label1 = tk.Label(window, text='URL：')
    entry = tk.Entry(window, width=35)
    entry.pack()
    entry.focus()
    label2 = tk.Label(window, text='', fg='red')

    button1 = tk.Button(window, text='开始解析', command=get_video)
    button2 = tk.Button(window, text='腾讯视频', command=lambda: open_url('https://v.qq.com/'))
    button3 = tk.Button(window, text='爱奇艺', command=lambda: open_url('https://www.iqiyi.com/'))
    button4 = tk.Button(window, text='优酷视频', command=lambda: open_url('https://youku.com/'))
    button5 = tk.Button(window, text='芒果TV', command=lambda: open_url('https://www.mgtv.com/'))
    button6 = tk.Button(window, text='咪咕视频', command=lambda: open_url('https://www.miguvideo.com/p/channel/'))
    label3 = tk.Label(window,
                      text='小K Tips：点击输入框下方的按钮进入官网主页，复制要看的视频链接后粘贴到”URL“\n输入框中，然后点击开始解析即可！双击清空url')

    label1.place(x=50, y=50)
    entry.place(x=100, y=50)
    button1.place(x=395, y=45)
    label2.place(x=170, y=90)

    button2.place(x=40, y=140)
    button3.place(x=140, y=140)
    button4.place(x=220, y=140)
    button5.place(x=315, y=140)
    button6.place(x=400, y=140)
    label3.place(x=25, y=210)

    center_window(window, 500, 300)
    entry.bind('<KeyRelease>', test_status)
    window.bind('<Return>', click_Enter)
    window.bind('<Double-Button-1>', clear_url)
    window.resizable(False, False)
    window.mainloop()
    window.protocol("WM_DELETE_WINDOW", sys.exit())


creat_window()

