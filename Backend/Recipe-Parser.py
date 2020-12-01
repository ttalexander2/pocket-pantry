# This file collects data from the websites where the recipes are held
# and collects data from it and displays it to the user natively on our
# app


import sys
import json
import recipe_scrapers
from recipe_scrapers import scrape_me


if len(sys.argv) != 2:
    sys.exit(0)

args = sys.argv
args.pop(0)

for url in args:
    scraper = None
    try:
        scraper = scrape_me(url.strip(), wild_mode=False)
        recipe = {
            "title": scraper.title(),
            "time": scraper.totalTime(),
            "yields": scraper.yields(),
            "ingredients": scraper.ingredients(),
            "instructions": scraper.instructions(),
            "image": scraper.image(),
            "host": scraper.host()
        }
        json_object = json.dumps(recipe, indent=4)
        print(json_object)
    except:
        try:
            scraper = scrape_me(url.strip(), wild_mode=True)
            recipe = {
                "title": scraper.title(),
                "yields": scraper.yields(),
                "ingredients": scraper.ingredients(),
                "instructions": scraper.instructions(),
                "image": scraper.image(),
                "host": scraper.host()
            }
            json_object = json.dumps(recipe, indent=4)
            print(json_object)
        except Exception as e:
            print(e)
            continue
