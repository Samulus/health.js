#!/usr/bin/env python3
# requires python3, beautifulsoup4, and uglifyjs / uglifycss
# TODO: use gulp / grunt / make  like a normal person
from bs4 import BeautifulSoup as Soup
import os, subprocess

def main():
  with open('index.html', 'r') as f:
    soup = Soup(f)

  if ("index.html" in os.listdir('mini')):
    os.remove('mini/index.html')

  mini_html = open('mini/index.html', 'w')

  css_tag = soup.new_tag('link', rel="stylesheet", href='health.css')
  js_tag = soup.new_tag('script', src='health.js')
  hcss = open('mini/health.css', 'wb')
  hjs  = open('mini/health.js', 'wb')

  css = []
  for elem in soup.find_all('link'):
    if (not (elem['href'].startswith(('http://', '//')))):
      css.append(elem['href'])
      elem.extract()

  js = []
  for elem in soup.find_all('script'):
    if (elem.has_attr('src')):
      js.append(elem['src'])
      elem.extract()

  hcss.write(subprocess.Popen(['uglifycss']+css, stdout=subprocess.PIPE).communicate()[0])
  hjs.write(subprocess.Popen(['uglifyjs']+js, stdout=subprocess.PIPE).communicate()[0])
  hcss.close()
  hjs.close()

  # insert new tags
  soup.find('link').insert_after(css_tag);
  soup.find('script').insert_before(js_tag);
  # write
  mini_html.write(str(soup))
  mini_html.close()


if __name__ == '__main__':
  main()
