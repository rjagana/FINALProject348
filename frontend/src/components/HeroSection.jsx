import React from "react";
import Navbar from "./NavBar";

const HeroSection = () => {
  
  return (
    <section className="heroSection" id="heroSection">
        <Navbar/>
      <div className="container">
        <div className="banner">
          <div className="largeBox">
            <h1 className="title">The Nibbler </h1>
            <p className="subheading"> Welcome to The Nibbler - Your Ultimate Restaurant Reservation Hub! </p>
<br></br>          
<p>
Are you ready to embark on a culinary journey like no other? Look no further than The Nibbler 
your one-stop destination for discovering, reserving, and savoring delightful dining experiences at every turn.
<br></br>
<br></br>
With The Nibbler, exploring a world of culinary wonders has never been easier. 
From cozy cafes to five-star restaurants, our extensive database features an eclectic array of dining establishments 
to suit every palate and occasion. Browse through mouthwatering menus, captivating ambiance, and glowing 
reviews to find your perfect dining destination. Say goodbye to waiting in long queues or frantically dialing multiple restaurants for a table. With just a few clicks, secure your spot at the hottest eateries in town. Our intuitive reservation system ensures seamless booking experiences, allowing you to lock in your preferred date, time, and party size with ease. </p>
<br></br>
Whether you're planning a romantic dinner for two or a celebratory feast with friends, let The Nibbler be your trusted companion in the world of dining. Join us today and embark on a culinary adventure filled with flavor, excitement, and unforgettable memories.
<br></br>
<br></br>
Explore some of the community's top rated restaurants and dishes by scrolling through below!
<br></br>
<br></br>
</div>
<div className="combined_boxes">
<div className="scroll-menu">
    <img src="./food1.jpg" class="image1" />
    <img src="./food3.jpg" class="image2" />
    <img src="./food2.jpg" class="image3" />
    <img src="./food4.jpg" class="image4" />
    <img src="./food5.jpg" class="image5" />
    <img src="./food6.jpg" class="image6" />



</div>
</div>
</div>


</div>



</section>

);
};




export default HeroSection;