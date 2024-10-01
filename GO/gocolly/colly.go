package main

// imports for what we need
import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/gocolly/colly"
)

// create the item information, capitals important
type Item struct {
	Name   string
	Price  string
	ImgUrl []string
}

// main function, the entry point to the application
func main() {
	c := colly.NewCollector(
		colly.MaxDepth(1),
		colly.AllowedDomains("j2store.net"),
	)

	// blank slice to add items too
	items := make([]Item, 0)

	// happens when the html is found
	c.OnHTML("div.col-sm-9 div[itemprop=itemListElement]", func(e *colly.HTMLElement) {
		item := Item{
			Name:   e.ChildText("h2.product-title"),
			Price:  e.ChildText("div.sale-price"),
			ImgUrl: e.ChildAttrs("div.j2store-product-images img", "src"),
		}
		items = append(items, item)
	})

	// happens when the html is found
	c.OnHTML("[title=Next]", func(h *colly.HTMLElement) {
		var next_page = h.Request.AbsoluteURL(h.Attr("href"))
		c.Visit(next_page)
	})

	// onrequest happens when the request is made
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// go to the url
	c.Visit("http://j2store.net/demo/index.php/shop")

	log.Println(c)

	content, err := json.Marshal(items)

	if err != nil {
		fmt.Println(err)
	}

	ioutil.WriteFile("test.json", content, 0644)

}
