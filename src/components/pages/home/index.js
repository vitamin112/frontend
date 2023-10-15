const Sidebar = () => {
  return (
    <>
      <header class="py-3 mb-4 border-bottom shadow">
        <div class="container-fluid align-items-center d-flex">
          <div class="flex-shrink-1">
            <a
              href="#"
              class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none"
            >
              <i class="bi bi-bootstrap fs-2 text-dark"></i>
            </a>
          </div>
          <div class="flex-grow-1 d-flex align-items-center">
            <form class="w-100 me-3">
              <input
                type="search"
                class="form-control"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </header>
      <div class="container-fluid pb-3 flex-grow-1 d-flex flex-column flex-sm-row overflow-auto">
        <div class="row flex-grow-sm-1 flex-grow-0">
          <aside class="col-sm-3 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0 pb-3">
            <div class="bg-light border rounded-3 p-1 h-100 sticky-top">
              <ul class="nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate">
                <li class="nav-item">
                  <a href="#" class="nav-link px-2 text-truncate">
                    <i class="bi bi-house fs-5"></i>
                    <span class="d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-2 text-truncate">
                    <i class="bi bi-speedometer fs-5"></i>
                    <span class="d-none d-sm-inline">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-2 text-truncate">
                    <i class="bi bi-card-text fs-5"></i>
                    <span class="d-none d-sm-inline">Orders</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-2 text-truncate">
                    <i class="bi bi-bricks fs-5"></i>
                    <span class="d-none d-sm-inline">Products</span>{" "}
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-2 text-truncate">
                    <i class="bi bi-people fs-5"></i>
                    <span class="d-none d-sm-inline">Customers</span>{" "}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <main class="col overflow-auto h-100">
            <div class="bg-light border rounded-3 p-3">
              <h2>Main</h2>
              <p>
                Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia
                salvia mustache 90's code editing brunch. Butcher polaroid VHS
                art party, hashtag Brooklyn deep v PBR narwhal sustainable
                mixtape swag wolf squid tote bag. Tote bag cronut semiotics, raw
                denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct
                trade ethical Odd Future jean shorts paleo. Forage Shoreditch
                tousled aesthetic irony, street art organic Bushwick artisan
                cliche semiotics ugh synth chillwave meditation. Shabby chic
                lomo plaid vinyl chambray Vice. Vice sustainable cardigan,
                Williamsburg master cleanse hella DIY 90's blog.
              </p>
              <p>
                Ethical Kickstarter PBR asymmetrical lo-fi. Dreamcatcher street
                art Carles, stumptown gluten-free Kickstarter artisan Wes
                Anderson wolf pug. Godard sustainable you probably haven't heard
                of them, vegan farm-to-table Williamsburg slow-carb readymade
                disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche
                American Apparel whatever. Helvetica cray plaid, vegan brunch
                Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies.
                Banh mi McSweeney's Shoreditch selfies, forage fingerstache food
                truck occupy YOLO Pitchfork fixie iPhone fanny pack art party
                Portland.
              </p>
              <hr />
              <h4>More content...</h4>
              <p>
                Ethical Kickstarter PBR asymmetrical lo-fi. Dreamcatcher street
                art Carles, stumptown gluten-free Kickstarter artisan Wes
                Anderson wolf pug. Godard sustainable you probably haven't heard
                of them, vegan farm-to-table Williamsburg slow-carb readymade
                disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche
                American Apparel whatever. Helvetica cray plaid, vegan brunch
                Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies.
                Banh mi McSweeney's Shoreditch selfies, forage fingerstache food
                truck occupy YOLO Pitchfork fixie iPhone fanny pack art party
                Portland.
              </p>
              <hr />
              <h4>More content...</h4>
              <p>
                Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia
                salvia mustache 90's code editing brunch. Butcher polaroid VHS
                art party, hashtag Brooklyn deep v PBR narwhal sustainable
                mixtape swag wolf squid tote bag. Tote bag cronut semiotics, raw
                denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct
                trade ethical Odd Future jean shorts paleo. Forage Shoreditch
                tousled aesthetic irony, street art organic Bushwick artisan
                cliche semiotics ugh synth chillwave meditation. Shabby chic
                lomo plaid vinyl chambray Vice. Vice sustainable cardigan,
                Williamsburg master cleanse hella DIY 90's blog.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
